'use strict';

const { orderList } = require('./seederData/order');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', orderList);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
