'use strict';

const { districtList } = require('../seederData-city');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Address_districts', districtList);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Address_districts', null, {});
  }
};
