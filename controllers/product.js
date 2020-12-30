const db = require('../models');
const { Product, Product_model, Photo } = db;

const typeArray = ["耳罩式耳機", "入耳式耳機", "音響", "週邊配件"]

const productController = {
  getAll: (req, res) => {
    let { sort, order, limit, offset, type } = req.query;
    const option = type !== undefined ? { type, isDeleted: null } : { isDeleted: null }

    Product.findAll({
      where: option,
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
          products.forEach((product) => {
            product.type = typeArray[Number(product.type) - 1];
            return
          })

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
                storage: storage > 10 ? "庫存充足" : storage
              }
            })

          const typeName = typeArray[Number(product.type) - 1]
          const productForUser = {
            ...product.dataValues, // 從 sequelize 物件拿出資料
            type: typeName,
            Product_models: models
          }

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
          console.log("get product error1: product has been deleted");
          return res.status(403).json({
            message: "product has been deleted"
          })
        }

        // 設定 type
        product.type = typeArray[Number(product.type) - 1]

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
              storage: storage > 10 ? "庫存充足" : storage
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
    const { productName, price, type, article } = req.body;

    if (!productName || !price || !type || !article) {
      console.log("add product error1: product data incomplete");
      return res.status(400).json({
        message: "product data incomplete"
      })
    }

    let typeNum = 0
    switch (type) {
      case "耳罩式耳機": {
        typeNum = 1
      }
      case "入耳式耳機": {
        typeNum = 2
      }
      case "音響": {
        typeNum = 3
      }
      case "週邊配件": {
        typeNum = 4
      }
      default: { }
    }

    Product.create({
      productName,
      price,
      type: typeNum,
      article,
      isShow: 0
    })
      .then((product) => {
        res.status(200).json({ product })
      })
      .catch(err => {
        console.log(`add product error2: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const { productName, price, type, article, isShow, isDeleted } = req.body;

    Product.findOne({ where: { id, isDeleted: null } })
      .then(product => {
        if (product === null) {
          return res.status(403).json({
            message: "update product error1: product has been deleted"
          })
        }
        return product.update({
          productName: productName !== undefined ? productName : product.productName,
          price: price !== undefined ? price : product.price,
          type: type !== undefined ? type : product.type,
          article: article !== undefined ? article : product.article,
          isShow: isShow !== undefined ? isShow : product.isShow,
          isDeleted: isDeleted !== undefined ? isDeleted : product.isDeleted,
        })
      })
      .then((product) => {
        res.status(200).json({ product })
      })
      .catch(err => {
        console.log(`update product error2: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
  delete: (req, res) => {
    const { id } = req.params
    Product.update(
      { isDeleted: 1 },
      { where: { id } }
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(err => {
        console.log(`delete product error: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  }
}

module.exports = productController;