

'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) {  
   
    }
  };
  Post.init({
    idUser: DataTypes.INTEGER,
    describeHtmlEn: DataTypes.TEXT,
    describeTextEn: DataTypes.TEXT,
    describeHtmlVi: DataTypes.TEXT,
    describeTextVi: DataTypes.TEXT, 
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',  
  }); 
  return Post;
};


