'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address_district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address_district.belongs
      Address_district.hasMany(models.Recipient, {
        foreignKey: 'districtId',
      })
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