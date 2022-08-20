

'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    
    static associate(models) {  

    
      Items.belongsTo(models.Items_info, {foreignKey: 'idItems', targetKey: 'itemsId',as : 'infoItemsData'})

      Items.belongsTo(models.Category, {foreignKey: 'category', targetKey: 'code',as : 'categoryData'})


     
      
   
    }
  };
  Items.init({
    idItems: DataTypes.STRING,
    idShop: DataTypes.INTEGER,
    manageId:  DataTypes.INTEGER,
    category: DataTypes.STRING,
    type: DataTypes.STRING, 
    discount: DataTypes.STRING,
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    newPrice: DataTypes.INTEGER,

  }, {
    sequelize,
    modelName: 'Items',  
  }); 
  return Items;
};


