'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {

    static associate(models) {  

      Type.hasMany(models.Items, {foreignKey: 'type', as : 'TypeData'})

      Type.hasOne(models.Items_discount, {foreignKey: 'forItemType'})

      Type.hasMany(models.Ship, {foreignKey: 'categoryType'})





     

    }
  };
  Type.init({
    typeId:  DataTypes.STRING,
    idUserCreate: DataTypes.STRING,
    code: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
}; 

