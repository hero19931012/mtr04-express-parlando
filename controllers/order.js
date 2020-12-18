const db = require('../models');
const { Order } = db;

const orderController = {
  getAll: (req, res) => {
    // 如果是 admin => 輸出全部訂單，如果是 user => where: userId
    Order.findAll()
      .then((orders) => {
        if (req.user.role === "admin") {
          return res.status(200).json({
            ok: 1,
            orders
          });
        }
        res.status(200).json({
          ok: 1,
          orders: orders.filter((order) => {
            return order.userId === req.user.id
          })
        })
      })
      .catch(err => {
        res.status(500).json({
          ok: 0,
          message: "Get order err: " + err.toString()
        })
      });
  },
  getOne: (req, res) => {
    const { id } = req.body;
    Order.findOne({
      where: {
        id
      }
    })
      .then((order) => {
        res.status(200).json({
          ok: 1,
          order
        })
      })
      .catch(err => {
        res.status(500).json({
          ok: 0,
          message: "Get one order err: " + err.toString()
        })
      })
  },
  add: (req, res) => {
    
  },
  delete: (req, res) => {

  }
}

module.exports = orderController;