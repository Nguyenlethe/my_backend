'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {

    static associate(models) {  

      Color.hasMany(models.Items_color_image, { foreignKey: 'color', as : 'colorData' })

    }
  };
  Color.init({
    colorId:  DataTypes.STRING,
    idUserCreate: DataTypes.STRING,
    code: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Color',
  });
  return Color;
}; 




