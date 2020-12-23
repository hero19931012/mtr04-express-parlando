'use strict';

const { orderProductList } = require('./seederData/order');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Order_products', orderProductList);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
