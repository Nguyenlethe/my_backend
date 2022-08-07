'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manage_oder extends Model {
    
    static associate(models) {  
   
    }
  };
  Manage_oder.init({
    itemsId: DataTypes.INTEGER,
    userGuestId: DataTypes.INTEGER,
    idShop:  DataTypes.INTEGER,
    itemsNumber: DataTypes.INTEGER,
    timeReceived: DataTypes.STRING, 
    timeCreate: DataTypes.STRING,
    priceShip: DataTypes.INTEGER,
    voucherApply: DataTypes.STRING,
    voucherApplyTow: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Manage_oder',  
  }); 
  return Manage_oder;
};


