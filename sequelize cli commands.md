## 建立 model
npx sequelize-cli model:generate --name Address_city --attributes cityName:STRING;npx sequelize-cli model:generate --name Product --attributes name:STRING,model:STRING,price:INTEGER,storage:INTEGER,sell:INTEGER;npx sequelize-cli model:generate --name User --attributes username:STRING,password:STRING,realName:STRING,email:STRING,phone:STRING;npx sequelize-cli model:generate --name Photo --attributes url:TEXT;npx sequelize-cli model:generate --name Admin --attributes username:STRING,password:STRING;npx sequelize-cli model:generate --name Order --attributes totalPrice:INTEGER,status:INTEGER;npx sequelize-cli model:generate --name Address_district --attributes districtName:STRING;npx sequelize-cli model:generate --name Recipient_info --attributes name:STRING,phone:STRING,email:STRING,address:STRING;npx sequelize-cli model:generate --name Order_product --attributes count:INTEGER,unitPrice:INTEGER;

## create migration (for association)
npx sequelize-cli migration:generate --name add-associations

## Migrate
npx sequelize-cli db:migrate;

## Undo migrate
npx sequelize-cli db:migrate:undo:all

---

## Seeder file for demo
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli seed:generate --name demo-admin
npx sequelize-cli seed:generate --name demo-city
npx sequelize-cli seed:generate --name demo-district
npx sequelize-cli seed:generate --name demo-product
npx sequelize-cli seed:generate --name demo-photo
npx sequelize-cli seed:generate --name demo-order
npx sequelize-cli seed:generate --name demo-order_product
npx sequelize-cli seed:generate --name demo-recipient_info


## Run seeds
npx sequelize-cli db:seed:all

## Undo all seeds
npx sequelize-cli db:seed:undo:all

--- 
### association migration
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
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
    //     onUpdate: 'CASCADE',
    //     onDelete: 'RESTRICT',
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
    //     onUpdate: 'CASCADE',
    //     onDelete: 'RESTRICT',
    //   }
    // );
  },

  down: async (queryInterface, Sequelize) => {
    // not necessary
    // await queryInterface.removeColumn('Address_districts', 'cityId');
    // await queryInterface.removeColumn('Addresses', 'cityId');
    // await queryInterface.removeColumn('Addresses', 'districtId');
    // await queryInterface.removeColumn('Addresses', 'userId');
    // await queryInterface.removeColumn('Order', 'addressId');
    // await queryInterface.removeColumn('Order', 'userId');
    // await queryInterface.removeColumn('Order_products', 'orderId');
    // await queryInterface.removeColumn('Order_products', 'productId');
  }
};
