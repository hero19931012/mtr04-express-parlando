const db = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Order, Order_product, Product, Product_model, Recipient } = db;

const orderController = {
  getAll: async (req, res) => {
    // 如果是 admin => 輸出全部訂單，如果是 user => where: userId
    const role = req.user.role
    const whereOption = role === 'admin' ? null : { userId: req.user.id }

    Order.findAll({
      where: whereOption,
      include: [Product_model]
    })
      .then((orders) => {
        if (role === 'admin') { return res.status(200).json({ orders }) }

        const orderDataForUser = orders.map((order) => {
          const { UUID, totalPrice, status, createdAt, Product_models } = order
          const products = Product_models.map((model) => {
            return {
              productId: model.productId,
              modelId: model.id,
              modelName: model.modelName,
              unitPrice: model.Order_product.unitPrice,
              count: model.Order_product.count
            }
          })

          let orderStatus = ''
          switch (status) {
            case 0: {
              orderStatus = "未付款";
              break;
            }
            case 1: {
              orderStatus = "處理中";
              break;
            }
            case 2: {
              orderStatus = "已出貨";
              break;
            }
            default: "處理中"
          }

          return {
            UUID,
            totalPrice,
            status: orderStatus,
            createdAt,
            products
          }
        })

        res.status(200).json({
          orders: orderDataForUser
        })
      })
      .catch(err => {
        console.log(`Get orders error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      });
  },
  getOne: async (req, res) => {
    const { UUID } = req.params;
    try {
      const order = await Order.findOne({
        where: { UUID },
        include: [Product_model, Recipient]
      })

      if (order === null) {
        console.log("get one order error1: invalid orderId");
        return res.status(400).json({
          message: "invalid orderId"
        })
      }

      // 如果是 admin 的話可以看全部的 order, user 只能看自己的
      if (req.user.role !== 'admin' && req.user.id !== order.userId) {
        return res.status(401).json({
          message: "invalid user"
        })
      }

      const { totalPrice, status, createdAt } = order;
      const products = order.Product_models.map((model) => {
        return {
          modelId: model.id,
          modelName: model.modelName,
          unitPrice: model.Order_product.unitPrice,
          count: model.Order_product.count
        }
      })

      res.status(200).json({
        order: {
          totalPrice,
          status,
          createdAt,
          products
        }
      })
    } catch (err) {
      console.log(`get one order error: ${err.toString()}`);
      return res.status(500).json({
        message: err.toString()
      })
    }
  },
  add: async (req, res) => {
    // 1. 對 products 遍歷，檢查庫存，取出 price 算出 totalPrice，把 model push 到陣列
    //////// transaction
    // 2. 新增一筆 order，寫入 userId, totalPrice => 拿到 orderId
    // 3. 更新 Product_model
    // 4. 遍歷 model array，寫入 productId, modelId, unitPrice 到 Order_product
    ////////

    const { products } = req.body;
    if (!products || products.length === 0) {
      console.log("add order error1: order data incomplete");
      return res.status(400).json({
        message: 'order data incomplete'
      })
    }

    const userId = req.user.id

    const orderProducts = []
    const modelArray = [] // 等下用來 update
    const modelUpdateDataArray = [] // update 的內容

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
        console.log("add order error1: no storage");
        return res.status(500).json({
          success: false,
          message: `${model.modelName} no storage`
        })
      }

      const unitPrice = model.Product.dataValues.price
      totalPrice += (unitPrice * count)

      modelArray.push(model)
      modelUpdateDataArray.push({
        storage: model.storage - count,
        sell: model.sell + count
      })
      orderProducts.push({
        modelId: model.id,
        count: count,
        unitPrice
      })
    }

    let orderId = 0

    try {
      db.sequelize.transaction(async () => {

        const orderContent = {
          UUID: uuidv4(),
          userId,
          totalPrice
        }

        if (totalPrice >= 30000) {
          throw new Error("total price must below 30,000")
        }

        const order = await Order.create(orderContent)
        orderId = order.id

        for (let i = 0; i < modelArray.length; i++) {
          await modelArray[i].update({
            ...modelUpdateDataArray[i]
          })
        }

        return await Order_product.bulkCreate(orderProducts.map(model => {
          return {
            orderId,
            ...model
          }
        }))
      })
        .then((result) => {
          res.status(200).json({
            orderId,
            totalPrice,
            result
          })
        })
        .catch(err => {
          console.log(`add order error2: ${err.toString()}`);
          return res.status(500).json({
            message: err.toString()
          })
        })
    } catch (err) {
      console.log(`add order error3: ${err.toString()}`);
      res.status(500).json({
        message: err.toString()
      })
    }
  },
  update: (req, res) => {
    const { UUID } = req.params;
    Order.update(
      { status: 1, updatedAt: new Date() },
      { where: { UUID } }
    )
      .then((order) => {
        res.status(204).end()
      })
      .catch(err => {
        console.log(`update order error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
  delete: (req, res) => {
    // 刪除訂單
    const { UUID } = req.params;
    Order.update(
      { isDeleted: 1, updatedAt: new Date() },
      { where: { UUID } }
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(err => {
        console.log(`delete order error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
}
module.exports = orderController;