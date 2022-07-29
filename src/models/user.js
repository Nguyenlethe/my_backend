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
    address: DataTypes.STRING,
    gender: DataTypes.STRING, 
    permission: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    avata: DataTypes.STRING,
    avataLink: DataTypes.STRING,
    province: DataTypes.STRING,
    district: DataTypes.STRING,
    wards: DataTypes.STRING,
    addressDetails:  DataTypes.STRING,
    dateCreate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'User',  
  }); 
  return User;
};


// manageId	permission	dateCreated	nameShop	addressShop	emailShop	phoneNumberShop	pay	province	likes
