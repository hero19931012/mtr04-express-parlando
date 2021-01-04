const db = require('../../models');
const { v4: uuidv4 } = require('uuid');
const { orderStatus } = require('../../constants/constants')
const { Order, Order_product, Product, Product_model, Recipient } = db;

const orderController = {
  getAll: async (req, res) => {
    // 如果是 admin => 輸出全部訂單，如果是 user => where: userId
    const role = req.user.role
    const whereOption = role === 'admin' ? { isDeleted: 0 } : {
      isDeleted: 0,
      userId: req.user.id
    }

    const orders = await Order.findAll({
      where: whereOption,
      include: [Product_model]
    })

    orders.forEach((order) => {
      order.status = orderStatus[order.status]
    })

    if (role === 'admin') {
      return res.status(200).json({
        success: true,
        data: { orders }
      })
    }

    const orderDataForUser = orders.map((order) => {
      const { UUID, totalPrice, status, createdAt, updatedAt, Product_models } = order
      const products = Product_models.map((model) => {
        return {
          productId: model.productId,
          modelId: model.id,
          modelName: model.modelName,
          unitPrice: model.Order_product.unitPrice,
          count: model.Order_product.count
        }
      })

      return {
        UUID,
        totalPrice,
        status,
        createdAt,
        updatedAt,
        products
      }
    })

    res.status(200).json({
      success: true,
      data: { orders: orderDataForUser }
    })
  },
  getOne: async (req, res) => {
    const { UUID } = req.params;
    const order = await Order.findOne({
      where: { UUID },
      include: [Product_model, Recipient]
    })

    if (order === null) {
      console.log("get one order error1: invalid orderId");
      return res.status(400).json({
        success: false,
        message: "invalid orderId"
      })
    }

    order.status = orderStatus[order.status]

    // 如果是 admin 的話可以看全部的 order, user 只能看自己的
    if (req.user.role !== 'admin' && req.user.id !== order.userId) {
      return res.status(403).json({
        success: false,
        message: "invalid user"
      })
    }

    const { totalPrice, status, createdAt, updatedAt } = order;
    const products = order.Product_models.map((model) => {
      return {
        productId: model.productId,
        modelId: model.id,
        modelName: model.modelName,
        unitPrice: model.Order_product.unitPrice,
        count: model.Order_product.count
      }
    })

    res.status(200).json({
      success: true,
      data: {
        order: {
          totalPrice,
          status,
          createdAt,
          updatedAt,
          products
        }
      }
    })
  },
  add: async (req, res) => {
    const userId = req.user.id
    const { products } = req.body;
    if (products === undefined || products.length === 0) {
      console.log("add order error: order data incomplete");
      return res.status(400).json({
        success: false,
        message: 'order data incomplete'
      })
    }

    const orderProducts = []

    const UUID = uuidv4();
    const newModels = []
    let totalPrice = 0


    for (let i = 0; i < products.length; i++) {
      const item = products[i]

      const model = await Product_model.findOne({
        where: { id: item.modelId },
        include: [Product],
        lock: true
      })

      const count = item.count

      if (count > model.storage) {
        console.log("add order error: no storage");
        return res.status(403).json({
          message: `${model.modelName} no storage`
        })
      }

      const unitPrice = model.Product.dataValues.price
      totalPrice += (unitPrice * count)

      newModels.push({
        model,
        updateData: {
          storage: model.storage - count,
          sell: model.sell + count
        }
      })

      orderProducts.push({
        modelId: model.id,
        count: count,
        unitPrice
      })
    }

    try {
      db.sequelize.transaction(async () => {

        const orderContent = {
          UUID,
          userId,
          totalPrice,
        }

        if (totalPrice >= 30000) {
          throw new Error("total price must below 30,000")
        }

        const order = await Order.create(orderContent)
        const orderId = order.id

        for (let i = 0; i < newModels.length; i++) {
          const { model, updateData } = newModels[i]
          await model.update({ ...updateData })
        }

        await Order_product.bulkCreate(orderProducts.map(model => {
          return {
            orderId,
            ...model
          }
        }))
      })
        .then(() => {
          res.status(200).json({
            success: true
          })
        })
        .catch(err => {
          console.log(`add order error: ${err.toString()}`);
          return res.status(500).json({
            success: false,
            message: err.toString()
          })
        })
    } catch (err) {
      console.log(`add order error: ${err.toString()}`);
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
  },
  update: (req, res) => {
    const { UUID } = req.params;
    Order.update(
      { status: 2, updatedAt: new Date() },
      { where: { UUID } }
    )
      .then(() => {
        res.status(202).json({
          success: true
        })
      })
      .catch(err => {
        console.log(`update order error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  },
  delete: async (req, res) => {
    // 1. 刪除訂單
    // 2. 更新庫存
    try {
      const { UUID } = req.params;
      const order = await Order.findOne({
        where: { UUID, isDeleted: 0 },
        include: [Product_model]
      })

      if (order === null) {
        console.log("delete order error: invalid orderId");
        return res.status(403).json({
          success: false,
          message: "invalid orderId"
        })
      }

      const products = order.Product_models.map((product) => {
        return {
          modelId: product.id,
          count: product.Order_product.count
        }
      })

      order.update({ isDeleted: 1 })
      for (let i = 0; i < products.length; i++) {
        const productModel = await Product_model.findOne({ where: { id: products[i].modelId } })
        await productModel.update({
          storage: productModel.storage + products[i].count,
          sell: productModel.sell - products[i].count
        })
      }
      res.status(200).json({
        success: true
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
  },
}
module.exports = orderController;