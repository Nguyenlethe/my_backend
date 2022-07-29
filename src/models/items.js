

'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    
    static associate(models) {  
   
    }
  };
  Items.init({
    idShop: DataTypes.INTEGER,
    manageId:  DataTypes.INTEGER,
    category: DataTypes.STRING,
    type: DataTypes.STRING, 
    discount: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    newPrice: DataTypes.INTEGER,
    dateCreate: DataTypes.DATE,
    updateTime: DataTypes.DATE,

  }, {
    sequelize,
    modelName: 'Items',  
  }); 
  return Items;
};


