
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star_shop extends Model {
    
    static associate(models) {  
   
    }
  };
  Star_shop.init({
    idShop: DataTypes.INTEGER,
    itemsId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    1: DataTypes.INTEGER,
    2: DataTypes.INTEGER,
    3: DataTypes.INTEGER,
    4: DataTypes.INTEGER,
    5: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Star_shop',  
  }); 
  return Star_shop;
};
