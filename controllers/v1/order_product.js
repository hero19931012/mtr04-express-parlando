const db = require('../../models');
const { Order_product } = db;

const orderProductController = {
  getAll: (req, res) => {
    Order_product.findAll()
      .then((products) => {
        res.status(200).json({
          success: true,
          data: { products }
        });
      })
      .catch(err => {
        console.log(`get order_products error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      });
  },
}

module.exports = orderProductController;