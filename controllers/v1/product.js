const db = require('../../models');
const { Product, Product_model, Photo } = db;
const { productTypes } = require('../../constants/constants')

const productController = {
  getAll: (req, res) => {
    let { sort, order, limit, offset, type } = req.query;
    const option = { isDeleted: 0 }
    if (type !== undefined) { option.type = type }
    if ((req.user === undefined || req.user !== "admin")) { option.isShow = 1 }

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
            product.type = productTypes[Number(product.type) - 1];
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

          const typeName = productTypes[Number(product.type) - 1]
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
      where: { id, isDeleted: 0, isShow: 1 },
      include: [Product_model, Photo]
    })
      .then((product) => {
        // 如果找不到 => product === null
        if (product === null) {
          console.log("get product error: product has been deleted");
          return res.status(403).json({
            success: false,
            message: "product has been deleted"
          })
        }

        // 設定 type
        product.type = productTypes[Number(product.type) - 1]

        // 如果是 admin 就回傳全部；如果是 user 只回傳 id, modelName, colorChip, storage
        if (req.user !== undefined && req.user.role === "admin") {
          return res.status(200).json({
            success: true,
            data: { product }
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
          success: true,
          data: { product: productForUser }
        })
      })
      .catch(err => {
        console.log(`get one product error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      });
  },
  add: (req, res) => {
    const { productName, price, type, article } = req.body;
    if (!productName || !price || !type || !article) {
      console.log("add product error: product data incomplete");
      return res.status(400).json({
        success: false,
        message: "product data incomplete"
      })
    }

    Product.create({
      productName,
      price,
      type: productTypes.indexOf(type) + 1,
      article,
      isShow: 0,
      isDeleted: 0
    })
      .then((product) => {
        res.status(200).json({
          success: true,
          data: { product }
        })
      })
      .catch(err => {
        console.log(`add product error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  },
  update: async (req, res) => {
    const { id } = req.params
    const { productName, price, type, article, isShow, isDeleted } = req.body;
    const product = await Product.findOne({ where: { id, isDeleted: 0 } })

    if (product === null) {
      console.log("update product error: product has been deleted");
      return res.status(403).json({
        success: false,
        message: "product has been deleted"
      })
    }

    // 根據傳進什麼內容進行更新
    product.update({
      productName: productName !== undefined ? productName : product.productName,
      price: price !== undefined ? price : product.price,
      type: type !== undefined ? type : product.type,
      article: article !== undefined ? article : product.article,
      isShow: isShow !== undefined ? isShow : product.isShow,
      updatedAt: new Date()
    })
      .then((product) => {
        res.status(200).json({
          success: true,
          data: { product }
        })
      })
      .catch(err => {
        console.log(`update product error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  },
  delete: (req, res) => {
    const { id } = req.params
    Product.update(
      {
        isDeleted: 1,
        updatedAt: new Date()
      },
      { where: { id } }
    )
      .then(() => {
        res.status(200).json({
          success: true
        })
      })
      .catch(err => {
        console.log(`delete product error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      })
  }
}

module.exports = productController;