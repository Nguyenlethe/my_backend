"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Trademark extends Model {
    static associate(models) {
      Trademark.hasMany(models.Items_info, {
        foreignKey: "trademark",
        as: "trademarkData",
      });
    }
  }
  Trademark.init(
    {
      trademarkId: DataTypes.STRING,
      idUserCreate: DataTypes.STRING,
      code: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Trademark",
    }
  );
  return Trademark;
};
