const db = require('../models');
const { Product } = db;

const productController = {
  getAll: (req, res) => {
    Product.findAll()
      .then((products) => {
        res.status(200).json({
          ok: 1,
          products
        });
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          errorMessage: err
        })
      });
  },
  getOne: (req, res) => {
    Product.findOne({
      where: {
        id: req.params.id
      }
    })
      .then((product) => {
        res.status(200).json({
          ok: 1,
          product
        });
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          errorMessage: err.toString()
        })
      });
  },
  add: (req, res) => {

  }, 
  
}

module.exports = productController;