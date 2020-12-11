'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address_city.hasMany(models.Recipient, {
        foreignKey: 'cityId',
      })
      Address_city.hasMany(models.Address_district, {
        foreignKey: 'cityId',
      })
    }
  };
  Address_city.init({
    cityName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address_city',
  });
  return Address_city;
};