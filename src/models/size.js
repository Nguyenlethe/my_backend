"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      Size.hasMany(models.Items_size_amount, {
        foreignKey: "size",
        as: "sizeData",
      });
    }
  }
  Size.init(
    {
      sizeId: DataTypes.STRING,
      code: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
