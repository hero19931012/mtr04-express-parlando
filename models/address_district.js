'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_district extends Model {

    static associate(models) {
      Recipient_info.belongsTo(models.Address_city, {
        foreignKey: 'cityId'
      });
      Recipient_info.belongsTo(models.Address_district, {
        foreignKey: 'districtId'
      });

    }
  };
  Address_district.init({
    districtName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address_district',
  });
  return Address_district;
};