'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {

    static associate(models) {  

      Type.hasMany(models.Items, {foreignKey: 'type', as : 'TypeData'})
     

    }
  };
  Type.init({
    typeId:  DataTypes.STRING,
    code: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
}; 

