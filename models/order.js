'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Order.hasMany(models.Recipient, {
        foreignKey: 'orderId'
      });
      Order.belongsToMany(models.Product_model, {
        through: models.Order_product,
        foreignKey: 'orderId'
      })
      Order.hasOne(models.ECpay_result, {
        foreignKey: 'orderId'
      });
    }
  };
  Order.init({
    UUID: DataTypes.UUID,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};