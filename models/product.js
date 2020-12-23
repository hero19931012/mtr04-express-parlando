'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Product_model, {
        foreignKey: 'productId'
      });
      Product.hasMany(models.Photo, {
        foreignKey: 'productId'
      });
    }
  };
  Product.init({
    productName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    article: DataTypes.TEXT,
    isShow: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};