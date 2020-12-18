'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ECpay_result extends Model {
    static associate(models) {
      ECpay_result.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      ECpay_result.hasOne(models.Order, {
        foreignKey: 'orderId',
      });
    }
  };
  ECpay_result.init({
    merchantId: DataTypes.INTEGER,
    merchantTradeNo: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    rtnCode: DataTypes.INTEGER,
    rtnMsg: DataTypes.STRING,
    tradeNo: DataTypes.STRING,
    paymenData: DataTypes.DATE,
    paymentType: DataTypes.STRING,
    paymentTypeChargeFee: DataTypes.INTEGER,
    tradeDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ECpay_result',
  });
  return ECpay_result;
};