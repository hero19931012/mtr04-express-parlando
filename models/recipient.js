'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipient.belongsTo(models.Order, {
        foreignKey: 'orderId'
      });
      Recipient.belongsTo(models.Address_city, {
        foreignKey: 'cityId'
      });
      Recipient.belongsTo(models.Address_district, {
        foreignKey: 'districtId'
      });
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