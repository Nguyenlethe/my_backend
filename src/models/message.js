'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Massage extends Model {
    
    static associate(models) {  
   
    }
  };
  Massage.init({
    idRoom: DataTypes.INTEGER,
    massage: DataTypes.STRING,
    idUser:  DataTypes.INTEGER,
    idShop: DataTypes.INTEGER,
    permission: DataTypes.STRING, 
    dateCreate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Massage',  
  }); 
  return Massage;
};





