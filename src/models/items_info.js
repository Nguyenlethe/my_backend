"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Items_info extends Model {
    static associate(models) {
      Items_info.hasMany(models.Items, {
        foreignKey: "idItems",
        as: "infoItemsData",
      });
      Items_info.belongsTo(models.Trademark, {
        foreignKey: "trademark",
        targetKey: "code",
        as: "trademarkData",
      });
    }
  }
  Items_info.init(
    {
      itemsId: DataTypes.STRING,
      describeHtmlEn: DataTypes.TEXT,
      describeTextEn: DataTypes.TEXT,
      describeHtmlVi: DataTypes.TEXT,
      describeTextVi: DataTypes.TEXT,
      trademark: DataTypes.STRING,
      production: DataTypes.STRING,
      sentFrom: DataTypes.STRING,
      texture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Items_info",
    }
  );
  return Items_info;
};
