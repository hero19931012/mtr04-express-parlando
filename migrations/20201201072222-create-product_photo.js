'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Product_photos', {
      productId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      photoId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Photos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Product_photos');
  }
};
