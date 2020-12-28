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
      MerchantID: {
        type: Sequelize.INTEGER
      },
      MerchantTradeNo: {
        type: Sequelize.STRING
      },
      StoreID: {
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
      PaymentDate: {
        type: Sequelize.DATE
      },
      PaymentType: {
        type: Sequelize.STRING
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