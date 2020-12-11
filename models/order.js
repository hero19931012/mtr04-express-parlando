'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Order.hasOne(models.Recipient, {
        foreignKey: 'orderId'
      });
      Order.belongsToMany(models.Product, {
        through: models.Order_product,
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