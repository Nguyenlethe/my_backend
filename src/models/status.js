
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    
    static associate(models) {  
   
    }
  };
  Status.init({
    idStatus:  DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',  
  }); 
  return Status;
};
