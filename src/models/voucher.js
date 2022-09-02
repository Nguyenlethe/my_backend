'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {

    static associate(models) {  

    }
  };
  Voucher.init({
    idVoucher:  DataTypes.STRING,
    idUserCreate:  DataTypes.STRING,
    codeVocher: DataTypes.STRING,
    limitVn: DataTypes.STRING,
    limitUs: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
}; 
















