"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    static associate(models) {
      Gender.hasMany(models.User, { foreignKey: "gender", as: "genderData" });
    }
  }
  Gender.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Gender",
    }
  );
  return Gender;
};
