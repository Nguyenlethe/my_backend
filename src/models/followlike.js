'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FollowLike extends Model {
    
    static associate(models) {  
   
    }
  };
  FollowLike.init({
    idUser: DataTypes.STRING,
    idShop: DataTypes.STRING,
    idItems: DataTypes.STRING,
    status:  DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'FollowLike',  
  }); 
  return FollowLike;
};




