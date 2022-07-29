'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {

    static associate(models) {  
 
    }
  };
  Province.init({
    type:  DataTypes.STRING,
    keyMap: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Province',
  });
  return Province;
}; 

// configuration