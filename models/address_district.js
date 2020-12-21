'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_district extends Model {

    static associate(models) {
      Address_district.belongsTo(models.Address_city, {
        foreignKey: 'cityId'
      });
      Address_district.hasMany(models.Recipient, {
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