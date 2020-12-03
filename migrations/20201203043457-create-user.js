'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      realName: {
        allowNull: false,
        type: Sequelize.STRING(64)
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(32)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};