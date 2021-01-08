'use strict';

const { recipientList } = require('./seederData/order');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recipients', recipientList);
  },

  down: async (queryInterface, Sequelize) => {
  }
};
