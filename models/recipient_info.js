'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipient_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recipient_info.belongsTo(models.Address_city, {
        foreignKey: 'cityId',
      });
      Recipient_info.belongsTo(models.Address_district, {
        foreignKey: 'districtId',
      });
      Recipient_info.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
    }
  };
  Recipient_info.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipient_info',
  });
  return Recipient_info;
};