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
}

module.exports = orderController;