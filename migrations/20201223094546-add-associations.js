'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Address_districts',
      'cityId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Address_cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Recipients',
      'cityId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Address_cities',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Recipients',
      'districtId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Address_districts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Recipients',
      'orderId',
      {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Orders',
      'userId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'ECpay_results',
      'orderUUID',
      {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: 'Order',
          key: 'UUID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Product_models',
      'productId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Order_products',
      'orderId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Order_products',
      'modelId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Product_models',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
    await queryInterface.addColumn(
      'Photos',
      'productId',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }
    );
  },

  down: async (queryInterface, Sequelize) => { }
};