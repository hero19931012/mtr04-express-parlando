'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.Order, {
        through: models.Order_product,
        foreignKey: 'productId'
      });
      Product.hasMany(models.Photo, {
        foreignKey: 'productId'
      });
    }
  };
  Product.init({
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    colorChip: DataTypes.STRING,
    price: DataTypes.INTEGER,
    storage: DataTypes.INTEGER,
    sell: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};