'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_size extends Model {

    static associate(models) {  

      Type_size.hasMany(models.Items_size_amount, { foreignKey: 'typeSize', as : 'typeSizeData' })
    
     

    }
  };
  Type_size.init({
    typeSizeId:  DataTypes.STRING,
    code: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Type_size',
  });
  return Type_size;
}; 

