"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("manage_oders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemsId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userGuestId: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idShop: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      itemsNumber: {
        type: Sequelize.INTEGER,
      },
      timeReceived: {
        type: Sequelize.STRING,
      },
      timeCreate: {
        type: Sequelize.STRING,
      },
      priceShip: {
        type: Sequelize.INTEGER,
      },
      voucherApply: {
        type: Sequelize.STRING,
      },
      voucherApplyTow: {
        type: Sequelize.INTEGER,
      },
      color: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("manage_oders");
  },
};
