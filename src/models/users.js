'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {  
   
    }
  };
  
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName:  DataTypes.STRING,
    gender: DataTypes.STRING, 
    permission: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    avata: DataTypes.STRING,
    avataLink: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    wards: DataTypes.STRING, 
    birthday:DataTypes.STRING, 
    addressDetails:  DataTypes.STRING,
    token: DataTypes.STRING,
    status: DataTypes.STRING,
    
    
  }, {
    sequelize,
    modelName: 'User',  
  }); 
  return User;
};


