const db = require('../../models');
const { Product, Product_model } = db;

async function checkProdcutAvailability(productId) {
  // 檢查 product 是否有可顯示的 model, 若沒有則更新 product isShow = 0
  const product = await Product.findOne({
    where: { id: productId, isDeleted: 0 },
    include: [Product_model]
  })

  if (product === null) return

  const modelsAvailable = product.Product_models.filter((model) => {
    return model.isShow === 1 && model.isDeleted === 0
  })

  console.log("product.isShow", product.isShow);
  console.log("modelsAvailable", modelsAvailable);

  if (modelsAvailable.length === 0 && product.isShow === 1) {
    await product.update({
      isShow: 0
    })
    console.log(`product id:${product.id} ${product.productName} has been hidden`);
  }
}

const modelController = {
  getOne: (req, res) => {
    const { id } = req.params
    Product_model.findOne({ where: { id, isDeleted: 0 } })
      .then((model) => {
        if (model === null) {
          console.log("get models error: model not exist or has been deleted");
          return res.status(403).json({
            success: false,
            message: "model not exist or has been deleted"
          })
        }
        return res.status(200).json({
          success: true,
          data: { model }
        })
      })
      .catch(err => {
        console.log(`get one model error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        })
      });
  },
  add: async (req, res) => {
    const { productId, modelName, colorChip, storage } = req.body
    if (
      !productId ||
      !modelName ||
      !colorChip ||
      !storage
    ) {
      console.log("add model error: model data incomplete");
      return res.status(403).json({
        success: false,
        message: "model data incomplete"
      })
    }

    if (storage >= 1000) {
      console.log("add model error: model storage must below 1,000");
      return res.status(403).json({
        success: false,
        message: "model storage must below 1,000"
      })
    }

    const product = await Product.findOne({ where: { id: productId } })
    const modelFullName = product.productName + modelName

    Product_model.create({
      productId,
      modelName: modelFullName,
      colorChip,
      storage,
      sell: 0,
      isShow: 0,
      isDeleted: 0
    })
      .then((model) => {
        res.status(200).json({
          success: true,
          data: { model }
        });
      })
      .catch(err => {
        console.log(`add model error: ${err.toString()}`);
        res.status(500).json({
          success: false,
          message: err.toString()
        });
      })
  },
  update: async (req, res) => {
    const { id } = req.params
    const {
      modelName,
      colorChip,
      storage,
      sell,
      isShow,
    } = req.body;

    if (storage >= 1000) {
      console.log("update model error: model storage must below 1,000");
      return res.status(400).json({
        success: false,
        message: "model storage must below 1,000"
      })
    }

    try {
      const model = await Product_model.findOne({
        where: { id, isDeleted: 0 },
        include: [Product]
      })
      if (model === null) {
        console.log("update model error: model not exist or has been deleted");
        res.status(403).json({
          success: false,
          message: "model not exist or has been deleted"
        })
      }

      const newModel = await model.update({
        modelName: modelName !== undefined ? modelName : model.modelName,
        colorChip: colorChip !== undefined ? colorChip : model.colorChip,
        storage: storage !== undefined ? storage : model.storage,
        sell: sell !== undefined ? sell : model.sell,
        isShow: isShow !== undefined ? isShow : model.isShow,
        updatedAt: new Date()
      })

      checkProdcutAvailability(model.Product.id)

      res.status(200).json({
        success: true,
        data: { model: newModel }
      })
    } catch (err) {
      console.log(`update model error: ${err.toString()}`);
      res.status(500).json({
        success: false,
        message: err.toString()
      })
    }
  },
  delete: async (req, res) => {
    const { id } = req.params
    try {
      const model = await Product_model.findOne({
        where: { id, isDeleted: 0 },
        include: [Product]
      })

      if (model === null) {
        console.log("delete model error: model has been deleted");
        res.status(403).json({
          success: false,
          message: "model not exist or has been deleted"
        })
      }

      await model.update({
        isDeleted: 1,
        updatedAt: new Date()
      })

      checkProdcutAvailability(model.Product.id)

      res.status(200).json({
        success: true
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "delete model error: " + err.toString()
      })
    }
  }
}

module.exports = modelController;