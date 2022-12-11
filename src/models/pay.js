"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pay extends Model {
    static associate(models) {
      // Allcode.hasMany(models.User, { foreignKey: 'gender', as : 'genderData' })
      // Allcode.hasMany(models.User, { foreignKey: 'permission', as : 'permissionData' })
    }
  }
  Pay.init(
    {
      type: DataTypes.STRING,
      keyMap: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Pay",
    }
  );
  return Pay;
};
