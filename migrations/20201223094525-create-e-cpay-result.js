'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ECpay_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MerchantId: {
        type: Sequelize.INTEGER
      },
      MerchantTradeNo: {
        type: Sequelize.INTEGER
      },
      StoreId: {
        type: Sequelize.INTEGER
      },
      RtnCode: {
        type: Sequelize.INTEGER
      },
      RtnMsg: {
        type: Sequelize.STRING
      },
      TradeNo: {
        type: Sequelize.STRING
      },
      PaymenData: {
        type: Sequelize.DATE
      },
      PaymentType: {
        type: Sequelize.STRING
      },
      PaymentTypeChargeFee: {
        type: Sequelize.INTEGER
      },
      TradeDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ECpay_results');
  }
};