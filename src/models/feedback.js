'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    
    static associate(models) {  
   
    }
  };
  Feedback.init({
    itemsId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    idShop:  DataTypes.INTEGER,
    content: DataTypes.STRING,
    status: DataTypes.STRING, 
    timeFeedback: DataTypes.STRING,
    start: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Feedback',  
  }); 
  return Feedback;
};




