const db = require('../models');
const { Order } = db;

const orderController = {
  getAll: (req, res) => {
    Order.findAll()
      .then((orders) => {
        res.status(200).json(orders);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getOne: (req, res) => {
    const { id } = req.body;
    Order.findOne({
      where: {
        id
      }
    })
      , then((order) => {
        res.status(200).json({
          ok: 1,
          order
        })
      })
  },
  getUserOrders: (req, res) => {
    const userId = req.query.userId;
    console.log("userId", userId);
    Order.findAll({
      where: { userId }
    })
      .then((res) => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = orderController;