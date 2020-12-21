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
          message: "Get order error: " + err.toString()
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
          message: "Get one order error1: " + err.toString()
        })
      })
  },
  add: async (req, res) => {
    // 1. 檢查是否有夠庫存
    // 2. lock Product table, 更新庫存
    requestData = {
      userId,
      totalPrice,
      products: [
        {
          productId,
          modelId,
        }
      ]
    }


    const { userId, totalPrice, products } = req.body;
    if (!userId, !totalPrice, !products) {
      return res.status(400).json({
        message: 'add order error1: order data incomplete'
      })
    }

    // transaction
    let count = 10

    try {
      const result = await db.sequelize.transaction(async ()=> {
        const product = await Product_model.findOne({where: {id: 1}})

        if (product.storage < count) {
          throw new Error("storage not enough")
        }        
        
        await product.update({
          storage: product.storage - count,
          sell: product.sell + count
        })

        return product
      })

      res.status(200).json({
        result,
      })
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "add order error2: " + err.toString()
      })
    }
  },
  update: (req, res) => {
    // 完成訂單 => status: 1, order_products.findAll({where: {orderId}})
  },
  delete: (req, res) => {

  },
}
module.exports = orderController;