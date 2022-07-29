'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {

    static associate(models) {  
 
    }
  };
  Allcode.init({
    type:  DataTypes.STRING,
    keyMap: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
}; 

// configuration