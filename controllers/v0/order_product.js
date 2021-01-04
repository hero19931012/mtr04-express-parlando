const db = require('../../models');
const { Order_product } = db;

const orderProductController = {
  getAll: (req, res) => {
    Order_product.findAll()
      .then((products) => {
        res.status(200).json({ products });
      })
      .catch(err => {
        res.status(500).json({
          message: "get order_products error: " + err.toString()
        })
      });
  },
}

module.exports = orderProductController;