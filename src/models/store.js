'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {

     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {  

      Store.belongsTo(models.User, {foreignKey: 'manageId',targetKey: 'id', as : 'FullName'})
      Store.hasMany(models.Items, {foreignKey: 'manageId', as: 'storeData'})

      Store.hasMany(models.Items_discount, {foreignKey: 'idShop'})


    }
  };
  Store.init({   
    manageId: DataTypes.INTEGER,
    permission: DataTypes.STRING,
    nameShop:  DataTypes.STRING,
    addressShop: DataTypes.STRING,
    emailShop: DataTypes.STRING, 
    phoneNumber: DataTypes.STRING,
    pay: DataTypes.STRING,
    province: DataTypes.STRING,
    follow: DataTypes.INTEGER,
    avata: DataTypes.STRING,
    coverImage: DataTypes.STRING,

 
  }, {
    sequelize,
    modelName: 'Store',  
  }); 
  return Store;
};



