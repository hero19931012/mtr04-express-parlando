'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ECpay_result extends Model {
    static associate(models) {
      ECpay_result.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
    }
  };
  ECpay_result.init({
    MerchantID: DataTypes.INTEGER,
    MerchantTradeNo: DataTypes.STRING,
    StoreID: DataTypes.INTEGER,
    RtnCode: DataTypes.INTEGER,
    RtnMsg: DataTypes.STRING,
    TradeNo: DataTypes.STRING,
    PaymentDate: DataTypes.DATE,
    PaymentType: DataTypes.STRING,
    TradeDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ECpay_result',
  });
  return ECpay_result;
};