"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Itemstests extends Model {
    static associate(models) {
      Itemstests.belongsTo(models.Items, {
        foreignKey: "idItems",
        as: "colorData",
      });
    }
  }
  Itemstests.init(
    {
      itemId: DataTypes.STRING,
      color: DataTypes.STRING,
      image: DataTypes.STRING,
      imageLink: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Itemstests",
    }
  );
  return Itemstests;
};
