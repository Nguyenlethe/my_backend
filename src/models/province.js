"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    static associate(models) {
      Province.hasMany(models.User, {
        foreignKey: "province",
        as: "provinceData",
      });
      Province.hasMany(models.User, {
        foreignKey: "district",
        as: "districtData",
      });
      Province.hasMany(models.User, { foreignKey: "wards", as: "wardsData" });
      Province.hasMany(models.Ship, { foreignKey: "province" });
    }
  }
  Province.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Province",
    }
  );
  return Province;
};

// configuration
