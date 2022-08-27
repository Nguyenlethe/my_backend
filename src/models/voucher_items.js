'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher_items extends Model {

    static associate(models) {  

      Voucher_items.belongsTo(models.Discount, {foreignKey: 'discounts', targetKey: 'code',as : 'discountData'})
    
     

    }
  };
  Voucher_items.init({
    voucherItemsId:  DataTypes.STRING,
    idCreateVoucher: DataTypes.STRING,
    codeVoucher: DataTypes.STRING,
    priceLimitVND: DataTypes.INTEGER,
    priceLimitUSD: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Voucher_items',
  });
  return Voucher_items;
}; 

