"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {}
  }
  Feedback.init(
    {
      itemsId: DataTypes.STRING,
      userId: DataTypes.STRING,
      idShop: DataTypes.STRING,
      content: DataTypes.STRING,
      status: DataTypes.STRING,
      timeFeedback: DataTypes.STRING,
      start: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
