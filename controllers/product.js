const db = require('../models');
const { Product, Product_model } = db;

const productController = {
  getAll: (req, res) => {
    let { sort, order, limit, offset } = req.query;

    Product.findAll({
      limit: limit !== undefined ? Number(limit) : null,
      offset: offset !== undefined ? Number(offset) : 0,
      order: [
        [
          sort === undefined ? sort : "id",
          order !== undefined ? sort : "ASC"
        ],
      ],
    })
      .then((products) => {
        console.log(products);
        res.status(200).json({
          ok: 1,
          products
        });
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          errorMessage: err.toString()
        })
      });
  },
  getOne: (req, res) => {
    const id = req.params.id
    console.log("id = ", id);
    Product.findOne({
      where: {
        id
      },
      include: [Product_model]
    })
      .then((product) => {
        // 如果是 admin 就回傳全部；如果是 user 只回傳 id, modelName, colorChip, storage
        if (req.user === "admin") {
          return res.status(200).json({
            ok: 1,
            product
          })
        }

        const models = product.Product_models
          .filter((model) => { return model.storage > 0 })
          .map((model) => {
            const { id, modelName, colorChip, storage } = model
            return {
              id,
              modelName,
              colorChip,
              storage: storage > 10 ? true : false
            }
          })

        const result = {...product.dataValues} // 從 sequelize 物件拿出資料
        result.Product_models = models

        res.status(200).json({
          ok: 1,
          product: result
        })
      })
      .catch(err => {
        res.status(400).json({
          ok: 0,
          errorMessage: err.toString()
        })
      });
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