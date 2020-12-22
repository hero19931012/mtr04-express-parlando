const db = require('../models');
const { Order, Order_product, Product, Product_model } = db;

const orderController = {
  getAll: (req, res) => {
    // 如果是 admin => 輸出全部訂單，如果是 user => where: userId
    Order.findAll()
      .then((orders) => {
        if (req.user.role === "admin") {
          return res.status(200).json({
            orders
          });
        }
        res.status(200).json({
          orders: orders.filter((order) => {
            return order.userId === req.user.id
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Get orders error: " + err.toString()
        })
      });
  },
  getOne: (req, res) => {
    const { id } = req.params;

    let totalPrice = 0;
    let status = null;

    Order.findOne({ where: { id } }).then(order => {
      // 如果是 admin 的話可以看全部的 order
      if (req.user.role !== 'admin' && req.user.id !== order.userId) {
        res.status(401).end()
      }

      totalPrice = order.totalPrice;
      status = order.status

      return Order_product.findAll({
        where: { orderId: id },
        include: [Product, Product_model]
      })
    })
      .then((content) => {
        const productList = content.map((product) => {
          return {
            productId: product.Product.id,
            productName: product.Product.productName,
            modelId: product.Product_model.id,
            modelName: product.Product_model.modelName,
            unitPrice: product.unitPrice,
            count: product.count
          }
        })

        const orderContent = {
          totalPrice,
          status,
          products: productList,
        }

        res.status(200).json({
          order: orderContent
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "Get one order error: " + err.toString()
        })
      })
  },
  add: async (req, res) => {
    const { userId, totalPrice, products } = req.body;
    if (!userId, !totalPrice, !products) {
      return res.status(400).json({
        message: 'add order error1: order data incomplete'
      })
    }

    const orderContent = {
      userId,
      totalPrice
    }

    ///// transaction
    // 1. 新增一筆 order => orderId
    // 2. 對 products 遍歷，拿到 unitPrice, count
    // 3. 檢查庫存，有庫存的話就寫入 Order_product
    /////

    try {
      db.sequelize.transaction(async () => {

        const order = await Order.create(orderContent)
        const orderId = order.id

        for (let i = 0; i < products.length; i++) {
          // product => {
          //  modelId,
          //  count
          // }
          const item = products[i]

          const model = await Product_model.findOne({
            where: { id: item.modelId },
            include: [Product]
          })

          if (item.count > model.storage) {
            throw new Error("no storage")
          }

          const order_product = {
            orderId,
            modelId: model.id,
            count: item.count,
            unitPrice: model.Product.dataValues.price
          }

          console.log(order_product);
        }
      })
        // 用來接 transaction 的 then & catch
        .then(() => {
          res.status(200).json({
            message: "add order success"
          })
        })
        .catch(err => {
          return res.status(500).json({
            message: "add order error: " + err.toString()
          })
        })
    } catch (err) {
      res.status(500).json({
        message: "add order error: " + err.toString()
      })
    }














































    // transaction
    // 1. 檢查是否有夠庫存
    // 2. lock Product table, 更新庫存

    // try {
    //   const result = await db.sequelize.transaction(async () => {

    //     const order = await Order.create({
    //       userId,
    //       totalPrice
    //     })

    //     await products.forEach(async (item) => {
    //       console.log(item);

    //       const product = await Product.findOne({
    //         where: { id: item.productId }
    //       })

    //       item.orderId = order.id
    //       item.unitPrice = product.price

    //       const model = await Product_model.findOne({
    //         where: { id: item.modelId },
    //         lock: true
    //       })

    //       const { count } = item

    //       if (item.storage < count) {
    //         throw new Error("no storage")
    //       }

    //       await model.update({
    //         storage: item.storage - count,
    //         sell: item.sell + count
    //       })

    //       await Order_product.create(item)
    //       .catch(err => { throw new Error("add order_product error") })
    //     })

    //     return order
    //   })
    //   res.status(200).json({
    //     result
    //   })
    // } catch (err) {
    //   console.log(err);
    //   res.status(500).json({
    //     message: "add order error2: " + err.toString()
    //   })
    // }
  },
  update: (req, res) => {
    // 完成訂單 => status: 1, order_products.findAll({where: {orderId}})
  },
  delete: (req, res) => {

  },
}
module.exports = orderController;