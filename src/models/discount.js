'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {

    static associate(models) {  

      Discount.hasMany(models.Items, {foreignKey: 'discounts', as : 'discountData'})
      Discount.hasMany(models.Items_discount, {foreignKey: 'codeReduce'})

     

    }
  };
  Discount.init({
    DiscountId:  DataTypes.STRING,
    code: DataTypes.STRING,
    valueEn: DataTypes.STRING,
    valueVi: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Discount',
  });
  return Discount;
}; 

