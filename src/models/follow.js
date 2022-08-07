'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    
    static associate(models) {  
   
    }
  };
  Follow.init({
    idUser: DataTypes.INTEGER,
    idShop: DataTypes.INTEGER,
    status:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Follow',  
  }); 
  return Follow;
};




