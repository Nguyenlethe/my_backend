
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartList extends Model {
    
    static associate(models) {  
   
    }
  };
  CartList.init({
    itemsId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    itemsName: DataTypes.STRING,
    itemsDetail:  DataTypes.TEXT,
    itemsNumber: DataTypes.INTEGER,
    itemsPrice: DataTypes.INTEGER, 
    image: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    itemsColor: DataTypes.STRING,
    itemsSize: DataTypes.STRING,
    dateCreate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CartList',  
  }); 
  return CartList;
};

