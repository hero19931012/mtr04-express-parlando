const db = require('../../models');
const { Product, Product_model, Photo } = db;
const { productTypes } = require('../../constants/constants')

const productController = {
  getAll: async (req, res) => {
    let { sort, order, limit, offset, type } = req.query;

    const whereOption = { isDeleted: 0 }
    if (type !== undefined) { whereOption.type = type }
    if (req.user === undefined || req.user.role !== "admin") {
      whereOption.isShow = 1
    }

    const options = {
      where: whereOption,
      order: [],
      include: [Product_model, Photo]
    }

    console.log("limit", limit);
    console.log("offset", offset);
    console.log("sort", sort);
    console.log("order", order);


    if (limit !== undefined) { options.limit = Number(limit) }
    if (offset !== undefined) { options.offset = Number(offset) }
    if (sort !== undefined) { options.order[0] = [sort] }
    if (sort !== undefined && order !== undefined) { options.order[0][1] = order }

    try {
      const products = await Product.findAll(options);
      if (req.user !== undefined && req.user.role === "admin") {
        // 如果 product 底下沒有 model 就顯示空陣列
        const responseData = products.map((product) => {
          const {
            id,
            productName,
            price,
            type,
            article,
            isShow,
            createdAt,
            updatedAt,
            Product_models,
            Photos: photos
          } = product

          const models = Product_models.filter((model) => {
            return model.dataValues.isDeleted !== 1
          })

          return {
            id,
            productName,
            price,
            type,
            article,
            isShow,
            createdAt,
            updatedAt,
            models,
            photos
          }
        })

        return res.status(200).json({
          success: true,
          data: {
            products: responseData
          }
        })
      }

      let responseData = products
        .filter((product) => {
          // 如果 product 底下沒有 model 可以顯示就不列入
          return product.Product_models.filter((model) => {
            return model.isDeleted !== 1
          }).length !== 0
        })
        .map((product) => {
          let {
            id,
            productName,
            price,
            type,
            article,
            createdAt,
            Product_models,
            Photos
          } = product;

          const productInfo = {
            id,
            productName,
            price,
            type: productTypes[Number(type) - 1],
            article,
            createdAt
          }

          const productModelInfo = Product_models
            .filter((model) => {
              return model.isShow === 1 && model.isDeleted === 0
            })
            .map((model) => {
              const { colorChip, storage } = model
              return {
                colorChip,
                storage: storage > 10 ? "庫存充足" : storage
              }
            })

          const productPhotoInfo = Photos.map((photo) => {
            return { url: photo.url }
          })

          return {
            ...productInfo,
            models: productModelInfo,
            photos: productPhotoInfo
          }
        })

      res.status(200).json({
        success: true,
        data: {
          products: responseData
        }
      })
    } catch (err) {
      console.log(`get products error: ${err.toString()}`);
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params
    const whereOption = {
      id,
      isDeleted: 0
    }

    if (req.user === undefined || req.user.role !== "admin") {
      whereOption.isShow = 1
    }

    try {
      const product = await Product.findOne({
        where: whereOption,
        include: [Product_model, Photo]
      })

      // 如果找不到 product === null 或無 model 可顯示
      if (
        product === null ||
        product.Product_models.filter((model) => {
          return model.isDeleted !== 1
        }).length === 0


      ) {
        console.log("get product error: product has been deleted");
        return res.status(403).json({
          success: false,
          message: "product has been deleted"
        })
      }

      if (req.user !== undefined && req.user.role === "admin") {
        return res.status(200).json({
          success: true,
          data: { product }
        })
      }

      const {
        productName,
        price,
        type,
        article,
        createdAt,
        Product_models,
        Photos
      } = product

      const productInfo = {
        productName,
        price,
        type: productTypes[Number(type) - 1],
        article,
        createdAt
      }

      const models = Product_models
        .filter((model) => { return model.storage > 0 && model.isDeleted !== 1 })
        .map((model) => {
          const { colorChip, storage } = model
          return {
            colorChip,
            storage: storage > 10 ? "庫存充足" : storage
          }
        })


      const photos = Photos.map((photo) => {
        return photo.url
      })

      res.status(200).json({
        success: true,
        data: {
          product: {
            ...productInfo,
            models,
            photos
          }
        }
      })
    } catch (err) {
      console.log(`get one product error: ${err.toString()}`);
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
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
        product.type = productTypes[Number(product.type) - 1]
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
    const { productName, price, type, article, isShow } = req.body;
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
      type: type !== undefined ? productTypes.indexOf(type) + 1 : product.type,
      article: article !== undefined ? article : product.article,
      isShow: isShow !== undefined ? isShow : product.isShow,
      updatedAt: new Date()
    })
      .then((product) => {
        product.type = productTypes[Number(product.type) - 1]
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