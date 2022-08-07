'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop_info extends Model {
    
    static associate(models) {  
   
    }
  };
  Shop_info.init({
    manageId: DataTypes.INTEGER,
    businessItems: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shop_info',  
  }); 
  return Shop_info;
};
