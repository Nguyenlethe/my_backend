'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_discount extends Model {
    
    static associate(models) {  
      Items_discount.belongsTo(models.Discount, {foreignKey: 'codeReduce', targetKey: 'code'})
      Items_discount.belongsTo(models.Voucher, {foreignKey: 'unitPrice', targetKey: 'codeVocher'})

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



