'use strict';

const { photoList } = require('./seederData/photo');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Photos', photoList);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {});
  }
};