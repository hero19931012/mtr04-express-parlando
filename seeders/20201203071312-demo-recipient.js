'use strict';

const { recipientList } = require('./seederData/recipient');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recipients', recipientList);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipients', null, {});
  }
};
