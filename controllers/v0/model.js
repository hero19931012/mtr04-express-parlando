const db = require('../../models');
const { Product, Product_model } = db;

const modelController = {
  getOne: (req, res) => {
    const { id } = req.params
    Product_model.findOne({ where: { id, isDeleted: 0 } })
      .then((model) => {
        if (model === null) {
          return res.status(403).json({
            message: "get models error1: model has been deleted"
          })
        }
        return res.status(200).json({ model })
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "get models error2" + err.toString()
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
      console.log("add model error1: model data incomplete");
      return res.status(400).json({
        message: "model data incomplete"
      })
    }

    if (storage >= 1000) {
      console.log("add model error2: model storage must below 1,000");
      return res.status(400).json({
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
        res.status(200).json({ model });
      })
      .catch(err => {
        console.log(`add model error3: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        });
      })
  },
  update: (req, res) => {
    const { id } = req.params
    const {
      modelName,
      colorChip,
      storage,
      sell,
      isShow,
      isDeleted
    } = req.body;

    if (storage >= 1000) {
      console.log("update model error1: model storage must below 1,000");
      return res.status(400).json({
        message: "model storage must below 1,000"
      })
    }

    Product_model.findOne({ where: { id, isDeleted: 0 } })
      .then(model => {
        if (model === null) {
          console.log("update model error2: model has been deleted");
          res.status(403).json({
            message: "model has been deleted"
          })
        }
        return model.update({
          modelName: modelName !== undefined ? modelName : model.modelName,
          colorChip: colorChip !== undefined ? colorChip : model.colorChip,
          storage: storage !== undefined ? storage : model.storage,
          sell: sell !== undefined ? sell : model.sell,
          isShow: isShow !== undefined ? isShow : model.isShow,
          isDeleted: isDeleted !== undefined ? isDeleted : model.isDeleted,
          updatedAt: new Date()
        })
      })
      .then((model) => {
        res.status(200).json({
          model
        })
      })
      .catch(err => {
        console.log(`update model error3: ${err.toString()}`);
        res.status(500).json({
          message: err.toString()
        })
      })
  },
  delete: (req, res) => {
    const { id } = req.params
    Product_model.findOne({ where: { id, isDeleted: 0 } })
      .then(model => {
        if (model === null) {
          console.log("delete model error1: model has been deleted");
          res.status(403).json({
            message: "model has been deleted"
          })
        }
        return model.update({
          isDeleted: 1,
          updatedAt: new Date()
        })
      })
      .then(() => {
        res.status(204).end()
      })
      .catch(err => {
        res.status(500).json({
          message: "delete model error2: " + err.toString()
        })
      })
  }
}

module.exports = modelController;