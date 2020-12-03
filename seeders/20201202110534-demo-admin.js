'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Admins', [{
      username: "lidemymtr",
      password: "$2b$10$lXbGqDvSMrJ3WzWRtzztbeizXvrjWVvSvxvJYXIxf7h.9N398ZOB2",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Admin', null, {});
  }
};
