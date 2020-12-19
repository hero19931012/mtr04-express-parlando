## 建立 model
npx sequelize-cli model:generate --name Admin --attributes username:STRING,password:STRING --force;
npx sequelize-cli model:generate --name User --attributes username:STRING,password:STRING,realName:STRING,email:STRING,phone:STRING --force;
npx sequelize-cli model:generate --name Address_city --attributes cityName:STRING --force;
npx sequelize-cli model:generate --name Address_district --attributes districtName:STRING --force;
npx sequelize-cli model:generate --name Product --attributes productName:STRING,price:INTEGER,isDeleted:INTEGER --force;
npx sequelize-cli model:generate --name Product_model --attributes modelName:STRING,colorChip:STRING,storage:INTEGER,sell:INTEGER,isDeleted:INTEGER --force;
npx sequelize-cli model:generate --name Photo --attributes url:TEXT --force;
npx sequelize-cli model:generate --name Order --attributes totalPrice:INTEGER,status:INTEGER --force;
npx sequelize-cli model:generate --name Recipient --attributes name:STRING,phone:STRING,email:STRING,address:STRING --force;
npx sequelize-cli model:generate --name Order_product --attributes count:INTEGER,unitPrice:INTEGER --force;
npx sequelize-cli model:generate --name ECpay_result --attributes merchantId:INTEGER,merchantTradeNo:INTEGER,storeId:INTEGER,rtnCode:INTEGER,rtnMsg:STRING,tradeNo:STRING,paymenData:DATE,paymentType:STRING,paymentTypeChargeFee:INTEGER,tradeDate:DATE --force

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
npx sequelize-cli seed:generate --name demo-model



## Run seeds
npx sequelize-cli db:seed:all

## Undo all seeds
npx sequelize-cli db:seed:undo:all
