'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ship extends Model {

    static associate(models) {  
 
    }
  };
  Ship.init({
    itemsId:  DataTypes.INTEGER,
    priceShip: DataTypes.STRING,
    province: DataTypes.STRING,
    dateCreate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Ship',
  });
  return Ship;
}; 

// configuration