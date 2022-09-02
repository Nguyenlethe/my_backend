

'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    
    static associate(models) {  

    
      Items.belongsTo(models.Items_info, {foreignKey: 'idItems', targetKey: 'itemsId',as : 'infoItemsData'})
      Items.belongsTo(models.Type, {foreignKey: 'type', targetKey: 'code',as : 'typeData'})
      Items.belongsTo(models.Category, {foreignKey: 'category', targetKey: 'code',as : 'categoryData'})
      Items.belongsTo(models.Store, {foreignKey: 'manageId', targetKey: 'manageId',as : 'storeData'})
      Items.belongsTo(models.Discount, {foreignKey: 'discounts', targetKey: 'code',as : 'discountData'})

      Items.belongsTo(models.Items_color_image, {foreignKey: 'idItems', targetKey: 'itemId',as : 'dataImgItems'})


    }
  };
  Items.init({
    idItems: DataTypes.STRING,
    idShop: DataTypes.INTEGER,
    manageId:  DataTypes.INTEGER,
    category: DataTypes.STRING,
    type: DataTypes.STRING, 
    discounts: DataTypes.STRING,
    name: DataTypes.STRING,
    nameEn: DataTypes.STRING,
    price: DataTypes.INTEGER,
    priceUS: DataTypes.INTEGER,
    newPrice: DataTypes.INTEGER,
    newPriceUS: DataTypes.INTEGER,


  }, {
    sequelize,
    modelName: 'Items',  
  }); 
  return Items;
};


