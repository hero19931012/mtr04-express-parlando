'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    static associate(models) {
      Recipient.belongsTo(models.Address_city, {
        foreignKey: 'cityId'
      });
      Recipient.belongsTo(models.Address_district, {
        foreignKey: 'districtId'
      });
      Recipient.hasOne(models.Order, {
        foreignKey: 'orderId'
      })
    }
  };
  Recipient.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipient',
  });
  return Recipient;
};