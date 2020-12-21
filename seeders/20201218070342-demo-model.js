'use strict';

const { modelList } = require('./seederData/product');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Product_models', modelList);
  },

  down: async (queryInterface, Sequelize) => {

  }
};
