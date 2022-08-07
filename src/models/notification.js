'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    
    static associate(models) {  
   
    }
  };
  Notification.init({
    idFeedback: DataTypes.INTEGER,
    itemsId: DataTypes.INTEGER,
    userId:  DataTypes.INTEGER,
    idShop: DataTypes.INTEGER,
    status: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Notification',  
  }); 
  return Notification;
};



