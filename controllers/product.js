const db = require('../models');
const { Product, Product_model, Photo } = db;

const productController = {
  getAll: (req, res) => {
    let { sort, order, limit, offset } = req.query;
    Product.findAll({
      where: {
        isDeleted: null
      },
      limit: limit !== undefined ? Number(limit) : null,
      offset: offset !== undefined ? Number(offset) : 0,
      order: [
        [
          sort !== undefined ? sort : "id",
          order !== undefined ? order : "ASC"
        ],
      ],
      include: [Product_model, Photo]
    })
      .then((products) => {
        // 如果是 admin 就回傳全部；如果是 user，回傳 id, modelName, colorChip, storage
        if (req.user !== undefined && req.user.role === 'admin') {
          return res.status(200).json({
            products
          });
        }

        const productListForUser = products.map((product) => {
          const models = product.Product_models
            .filter((model) => { return model.storage > 0 })
            .map((model) => {
              const { id, modelName, colorChip, storage } = model
              return {
                id,
                modelName,
                colorChip,
                storage
              }
            })

          const productForUser = { ...product.dataValues } // 從 sequelize 物件拿出資料
          productForUser.Product_models = models

          return {
            ...productForUser
          }
        })

        res.status(200).json({
          products: productListForUser
        })
      })
      .catch(err => {
        res.status(400).json({
          message: "get products error: " + err.toString()
        })
      });
  },
  getOne: (req, res) => {
    const { id } = req.params
    Product.findOne({
      where: { id, isDeleted: null },
      include: [Product_model, Photo]
    })
      .then((product) => {
        // 如果找不到 => product === null
        if (product === null) {
          res.status(403).json({
            message: "get product error1: " + "product has been deleted"
          })
        }

        // 如果是 admin 就回傳全部；如果是 user 只回傳 id, modelName, colorChip, storage
        if (req.user !== undefined && req.user.role === "admin") {
          return res.status(200).json({
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
              storage
            }
          })

        const productForUser = { ...product.dataValues } // 從 sequelize 物件拿出資料
        productForUser.Product_models = models

        res.status(200).json({
          product: productForUser
        })
      })
      .catch(err => {
        res.status(500).json({
          message: "get product error2: " + err.toString()
        })
      });
  },
  add: (req, res) => {
    const { productName, price, type } = req.body;

    if (!productName || !price || !type) {
      console.log("add product error1: product data incomplete");
      return res.status(400).json({
        message: "product data incomplete"
      })
    }

    Product.create({
      productName,
      price,
      type
    })
      .then((product) => {
        res.status(200).json({ product })
      })
      .catch(err => {
        res.status(500).json({
          message: "add product error2: " + err.toString()
        })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { productName, price } = req.body;

    if (!productName || !price) {
      return res.status(400).json({
        message: "update product error1: product data incomplete"
      })
    }

    Product.findOne({ where: { id, isDeleted: null } })
      .then(product => {
        if (product === null) {
          return res.status(403).json({
            message: "update product error2: product has been deleted"
          })
        }
        return product.update({
          productName,
          price
        })
      })
      .then((product) => {
        res.status(200).json({ product })
      })
      .catch(err => {
        res.status(500).json({
          message: "update product error3: " + err.toString()
        })
      })
  },
  delete: (req, res) => {
    const { id } = req.params
    Product.findOne({ where: { id } })
      .then(product => {
        return product.update({
          isDeleted: 1
        })
      })
      .then(() => {
        res.status(204).end()
      })
      .catch(err => {
        res.status(403).json({
          message: "update product error: " + err.toString()
        })
      })
  }
}

module.exports = productController;