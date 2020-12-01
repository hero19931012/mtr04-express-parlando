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
      // define association here
    }
  };
  Address_district.init({
    dictrictName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address_district',
  });
  return Address_district;
};