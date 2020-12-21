'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Order_product, {
        foreignKey: 'productId'
      });
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
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};