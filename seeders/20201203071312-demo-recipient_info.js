'use strict';

const { recipientList } = require('./seederData/recipient-info');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Recipient_infos', recipientList);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipient_infos', null, {});
  }
};
