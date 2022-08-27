'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items_size_amount extends Model {
    
    static associate(models) {  



      Items_size_amount.belongsTo(models.Size, {foreignKey: 'size',targetKey: 'code', as : 'sizeData'})
      Items_size_amount.belongsTo(models.Type_size, {foreignKey: 'typeSize',targetKey: 'code', as : 'typeSizeData'})




      
   
    }
  };
  Items_size_amount.init({
    itemsId: DataTypes.STRING,
    typeSize: DataTypes.STRING,
    size:  DataTypes.STRING,
    amount: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Items_size_amount',  
  }); 
  return Items_size_amount;
};

