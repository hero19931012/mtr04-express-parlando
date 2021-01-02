'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    static associate(models) {
      Photo.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
    }
  };
  Photo.init({
    url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};