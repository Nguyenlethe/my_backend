'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class items_discount extends Model {
    
    static associate(models) {  
   
    }
  };
  items_discount.init({
    idShop: DataTypes.INTEGER,
    codeReduce: DataTypes.STRING,
    unitPrice: DataTypes.STRING,
    dayStart: DataTypes.STRING,
    dayEnd: DataTypes.STRING, 
    forItemCategory: DataTypes.STRING,
    forItemType: DataTypes.STRING,
    itemsId: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'items_discount',  
  }); 
  return items_discount;
};



