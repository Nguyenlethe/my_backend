'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_discount extends Model {
    
    static associate(models) {  

      Items_discount.belongsTo(models.Discount, {foreignKey: 'codeReduce', targetKey: 'code'})
      Items_discount.belongsTo(models.Voucher, {foreignKey: 'unitPrice', targetKey: 'codeVocher'})

      Items_discount.belongsTo(models.Items, {foreignKey: 'itemsId', targetKey: 'idItems'})


      Items_discount.belongsTo(models.Category, {foreignKey: 'forItemCategory', targetKey: 'code'})
      Items_discount.belongsTo(models.Type, {foreignKey: 'forItemType', targetKey: 'code'})

      Items_discount.belongsTo(models.Items_color_image, {foreignKey: 'itemsId', targetKey: 'itemId'})

      Items_discount.belongsTo(models.Store, {foreignKey: 'idShop', targetKey: 'id'})



    }
  };
  Items_discount.init({
    idShop: DataTypes.INTEGER,
    codeReduce: DataTypes.STRING,
    unitPrice: DataTypes.STRING,
    dayStart: DataTypes.STRING,
    dayEnd: DataTypes.STRING, 
    forItemCategory: DataTypes.STRING,
    forItemType: DataTypes.STRING,
    itemsId: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Items_discount',  
  }); 
  return Items_discount;
};



