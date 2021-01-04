'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_models', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelName: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      colorChip: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      storage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sell: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isShow: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isDeleted: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Product_models');
  }
};