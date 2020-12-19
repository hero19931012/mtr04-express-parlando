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
      merchantId: {
        type: Sequelize.INTEGER
      },
      merchantTradeNo: {
        type: Sequelize.INTEGER
      },
      storeId: {
        type: Sequelize.INTEGER
      },
      rtnCode: {
        type: Sequelize.INTEGER
      },
      rtnMsg: {
        type: Sequelize.STRING
      },
      tradeNo: {
        type: Sequelize.STRING
      },
      paymenData: {
        type: Sequelize.DATE
      },
      paymentType: {
        type: Sequelize.STRING
      },
      paymentTypeChargeFee: {
        type: Sequelize.INTEGER
      },
      tradeDate: {
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