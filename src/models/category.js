'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {

    static associate(models) {  

      Category.hasMany(models.Items, {foreignKey: 'category', as : 'categoryData'})
     

    }
  };
  Category.init({
    categoryId:  DataTypes.STRING,
    code: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
}; 

