'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ship extends Model {

    static associate(models) {  
      Ship.belongsTo(models.Category, {foreignKey: 'category',targetKey: 'code'})
      Ship.belongsTo(models.Store, {foreignKey: 'idShop',targetKey: 'manageId'})
      Ship.belongsTo(models.Type, {foreignKey: 'categoryType', targetKey: 'code'})
      Ship.belongsTo(models.Items, {foreignKey: 'itemsId', targetKey: 'idItems'})

      Ship.belongsTo(models.Province, {foreignKey: 'province', targetKey: 'keyMap'})




 
    }
  };
  Ship.init({
    idShop: DataTypes.STRING,
    itemsId:  DataTypes.STRING,
    category:   DataTypes.STRING,
    categoryType: DataTypes.STRING,
    priceShipVN: DataTypes.STRING,
    priceShipUS:DataTypes.INTEGER,
    province:  DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Ship',
  });
  return Ship; 
}; 

