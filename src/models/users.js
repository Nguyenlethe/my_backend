'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {  
      
      User.belongsTo(models.Allcode, {foreignKey: 'gender',targetKey: 'keyMap', as : 'genderData'})
      User.belongsTo(models.Allcode, {foreignKey: 'permission',targetKey: 'keyMap', as : 'permissionData'})
      User.belongsTo(models.Province, {foreignKey: 'province',targetKey: 'keyMap', as : 'provinceData'})
      User.belongsTo(models.Province, {foreignKey: 'district',targetKey: 'keyMap', as : 'districtData'})
      User.belongsTo(models.Province, {foreignKey: 'wards',targetKey: 'keyMap', as : 'wardsData'})

      User.hasOne(models.Store, {foreignKey: 'id',  as : 'FullName' })

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


