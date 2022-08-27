'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {  
      Role.hasMany(models.User, { foreignKey: 'permission', as : 'permissionData' })

    }
  };
  Role.init({
    type:  DataTypes.STRING,
    keyMap: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
}; 


