const db = require('../models');
const { Order_product } = db;

const orderProductController = {
  getAll: (req, res) => {
    Order_product.findAll()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
      });
  },
}

module.exports = orderProductController;