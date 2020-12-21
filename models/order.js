'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Order.hasMany(models.Recipient, {
        foreignKey: 'orderId',
      });
      Order.hasMany(models.Order_product, {
        foreignKey: 'orderId',
      });
      Order.hasOne(models.ECpay_result, {
        foreignKey: 'orderId'
      });
    }
  };
  Order.init({
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};