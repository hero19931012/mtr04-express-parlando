'use strict';

const { cityList } = require('./seederData/seederData-city')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Address_cities', cityList);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Address_cities', null, {});
  }
};
