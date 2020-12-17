'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_model extends Model {

    static associate(models) {
      Product_model.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
      Product_model.hasMany(models.Order_product, {
        foreignKey: 'modelId'
      });
    }
  };
  Product_model.init({
    modelName: DataTypes.STRING,
    colorChip: DataTypes.STRING,
    storage: DataTypes.INTEGER,
    sell: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product_model',
  });
  return Product_model;
};