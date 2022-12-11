"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class System_notificatios extends Model {
    static associate(models) {}
  }
  System_notificatios.init(
    {
      status: DataTypes.STRING,
      subject: DataTypes.STRING,
      title: DataTypes.STRING,
      contentVi: DataTypes.TEXT,
      contentEn: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "System_notificatios",
    }
  );
  return System_notificatios;
};
