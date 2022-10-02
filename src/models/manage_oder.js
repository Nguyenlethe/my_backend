'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manage_oder extends Model {
    
    static associate(models) {  
      Manage_oder.belongsTo(models.Items, {foreignKey: 'itemsId', targetKey: 'idItems'})
    }
  };
  Manage_oder.init({
    itemsId: DataTypes.STRING,
    userGuestId: DataTypes.STRING,
    idShop:  DataTypes.STRING,
    itemsNumber: DataTypes.INTEGER,
    timeReceived: DataTypes.STRING, 
    timeCreate: DataTypes.STRING,
    priceShip: DataTypes.INTEGER,
    voucherApply: DataTypes.STRING,
    voucherApplyTow: DataTypes.STRING,
    status: DataTypes.STRING,
    color: DataTypes.STRING,
    size: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Manage_oder',  
  }); 
  return Manage_oder;
};


