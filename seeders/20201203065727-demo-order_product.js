'use strict';

const { orderproductList } = require('./seederData/order');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Order_products', orderproductList);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Order_products', null, {});
  }
};