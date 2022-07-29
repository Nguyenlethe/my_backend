'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_color_image extends Model {
    
    static associate(models) {  
   
    }
  };
  Items_color_image.init({
    itemId: DataTypes.INTEGER,
    color: DataTypes.STRING,
    image:  DataTypes.STRING,
    imageLink: DataTypes.STRING,
    dateCreate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Items_color_image',  
  }); 
  return Items_color_image;
};



