

'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_info extends Model {
    
    static associate(models) {  
   
    }
  };
  Items_info.init({
    itemsId: DataTypes.INTEGER,
    describeHtmlEn: DataTypes.TEXT,
    describeTextEn: DataTypes.TEXT,
    describeHtmlVi: DataTypes.TEXT,
    describeTextVi: DataTypes.TEXT, 
    trademark: DataTypes.STRING,
    production: DataTypes.STRING,
    sentFrom: DataTypes.STRING,
    texture: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Items_info',  
  }); 
  return Items_info;
};

