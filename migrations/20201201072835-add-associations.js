'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Address_districts',
      'cityId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Address_cities',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Addresses',
      'cityId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Address_cities',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Addresses',
      'districtId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Address_districts',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Addresses',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Orders',
      'addressId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Addresses',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Orders',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Order_products',
      'orderId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    await queryInterface.addColumn(
      'Order_products',
      'productId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        onUpdate: 'RESTRICT',
        onDelete: 'SET NULL',
      }
    );
    // await queryInterface.addColumn(
    //   'Product_photos',
    //   'productId',
    //   {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Products',
    //       key: 'id',
    //     },
    //     onUpdate: 'RESTRICT',
    //     onDelete: 'SET NULL',
    //   }
    // );
    // await queryInterface.addColumn(
    //   'Product_photos',
    //   'photoId',
    //   {
    //     type: Sequelize.INTEGER,
    //     references: {
    //       model: 'Photos',
    //       key: 'id',
    //     },
    //     onUpdate: 'RESTRICT',
    //     onDelete: 'SET NULL',
    //   }
    // );
  },

  down: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('Order_products', 'productId');
    // await queryInterface.removeColumn('Order_products', 'orderId');
    // await queryInterface.removeColumn('Orders', 'addressId');
    // await queryInterface.removeColumn('Orders', 'userId');
    // await queryInterface.removeColumn('Addresses', 'cityId');
    // await queryInterface.removeColumn('Addresses', 'userId');
    // await queryInterface.removeColumn('Addresses', 'districtId');
    // await queryInterface.removeColumn('Address_districts', 'cityId');
  }
};
