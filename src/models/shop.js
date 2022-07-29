'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    
    static associate(models) {  
   
    }
  };
  Shop.init({
    manageId: DataTypes.INTEGER,
    permission: DataTypes.STRING,
    nameShop:  DataTypes.STRING,
    addressShop: DataTypes.STRING,
    emailShop: DataTypes.STRING, 
    phoneNumber: DataTypes.STRING,
    pay: DataTypes.STRING,
    province: DataTypes.STRING,
    like: DataTypes.STRING,
    dateCreate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Shop',  
  }); 
  return Shop;
};


