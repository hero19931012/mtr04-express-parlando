'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ECpay_result extends Model {
    static associate(models) {
      ECpay_result.belongsTo(models.Order, {
        foreignKey: 'orderUUID',
      });
    }
  };
  ECpay_result.init({
    MerchantId: DataTypes.INTEGER,
    MerchantTradeNo: DataTypes.STRING,
    StoreId: DataTypes.INTEGER,
    RtnCode: DataTypes.INTEGER,
    RtnMsg: DataTypes.STRING,
    RradeNo: DataTypes.STRING,
    PaymenData: DataTypes.DATE,
    PaymentType: DataTypes.STRING,
    PaymentTypeChargeFee: DataTypes.INTEGER,
    TradeDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ECpay_result',
  });
  return ECpay_result;
};