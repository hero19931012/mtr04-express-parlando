'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_product extends Model {
    static associate(models) {
      Order_product.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
      Order_product.belongsTo(models.Product_model, {
        foreignKey: 'modelId',
      });
    }
  };
  Order_product.init({
    count: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order_product',
  });
  return Order_product;
};