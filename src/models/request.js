'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    
    static associate(models) {  
   
    }
  };
  Request.init({
    idUser: DataTypes.INTEGER,
    email: DataTypes.STRING,
    status:  DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Request',  
  }); 
  return Request;
};



