"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Items, {
        foreignKey: "category",
        as: "categoryData",
      });
      Category.hasMany(models.Items_discount, {
        foreignKey: "forItemCategory",
      });
      Category.hasMany(models.Ship, { foreignKey: "category" });
    }
  }
  Category.init(
    {
      categoryId: DataTypes.STRING,
      idUserCreate: DataTypes.STRING,
      code: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
