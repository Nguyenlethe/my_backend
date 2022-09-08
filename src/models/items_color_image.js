'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_color_image extends Model {
    
    static associate(models) {  
      
      Items_color_image.belongsTo(models.Color, {foreignKey: 'color',targetKey: 'code', as : 'colorData'})

      Items_color_image.hasMany(models.Items, {foreignKey: 'idItems', as : 'dataImgItems'})

      Items_color_image.hasMany(models.Items_discount, {foreignKey: 'itemsId'})

      
     

    }
  };
  Items_color_image.init({
    itemId: DataTypes.STRING,
    color: DataTypes.STRING,
    image:  DataTypes.STRING,
    imageLink: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Items_color_image',  
  }); 
  return Items_color_image;
};



