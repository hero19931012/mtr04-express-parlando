const db = require('../models');
const { Product, Product_model } = db;

const productController = {
  getAll: (req, res) => {
    const { sort, order, limit, offset } = req.query;
    Product.findAll({
      limit: Number(limit),
      offset: Number(offset),
      order: [
        [sort, order],
      ],
    })
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
      },
      include: [Product_model]
    })
    .then((product) => {
      // console.log(product);

      // 只回傳 id, colorChip, storage
      const models = product.Product_models
      .filter((model) => { return model.storage > 0 })
      .map((model) => {
        const { id, colorChip, storage } = model
        return {
          id,
          colorChip,
          storage: storage > 10 ? true : false
        }
      })

      res.status(200).json({
        ok: 1,
        models
      })
    })
      // .then((product) => {
      //   res.status(200).json({
      //     ok: 1,
      //     product
      //   });
      // })
      // .catch(err => {
      //   res.status(400).json({
      //     ok: 0,
      //     errorMessage: err.toString()
      //   })
      // });
  },
  add: (req, res) => {
    const product = req.body
    console.log(product);
    Product.create({
      productName: product.productName,
      price: product.price
    })
      .then(result => {
        console.log("product create result: " + result);
        const modelsWithProductId = product.models.map((model) => {
          return {
            ...model,
            sell: 0,
            productId: result.id
          }
        })
        return Product_model.bulkCreate(modelsWithProductId)
      })
      .then((result) => {
        console.log("model create result: " + result);
        res.status(200).json({
          ok: 1,
          result
        })
      })
      .catch(err => {
        let errorMessage = "product create error: " + err.toString()
        console.log(errorMessage);
        res.status(400).json({
          ok: 0,
          message: errorMessage
        })
      })
  },
  update: (req, res) => {

  }
}

module.exports = productController;