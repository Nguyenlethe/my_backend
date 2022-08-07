'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_size_amount extends Model {
    
    static associate(models) {  
   
    }
  };
  Items_size_amount.init({
    manageId: DataTypes.INTEGER,
    permission: DataTypes.STRING,
    nameShop:  DataTypes.STRING,
    addressShop: DataTypes.STRING,
    emailShop: DataTypes.STRING, 
    phoneNumber: DataTypes.STRING,
    pay: DataTypes.STRING,
    province: DataTypes.STRING,
    like: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Items_size_amount',  
  }); 
  return Items_size_amount;
};


