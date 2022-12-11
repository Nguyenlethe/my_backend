"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image_feedback extends Model {
    static associate(models) {}
  }
  Image_feedback.init(
    {
      idUser: DataTypes.INTEGER,
      idFeedback: DataTypes.INTEGER,
      status: DataTypes.STRING,
      image: DataTypes.STRING,
      imageLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Image_feedback",
    }
  );
  return Image_feedback;
};
