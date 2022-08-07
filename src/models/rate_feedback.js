'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rate_feedback extends Model {
    
    static associate(models) {  
   
    }
  };
  Rate_feedback.init({
    idfeedback: DataTypes.INTEGER,
    idUserRepFeedback: DataTypes.INTEGER,
    repContent:  DataTypes.STRING,
    status: DataTypes.STRING,
    timeRepFeedback: DataTypes.STRING, 
    
  }, {
    sequelize,
    modelName: 'Rate_feedback',  
  }); 
  return Rate_feedback;
};



