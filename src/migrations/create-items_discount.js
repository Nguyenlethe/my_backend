"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("items_discounts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      idShop: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      codeReduce: {
        type: Sequelize.STRING,
      },
      unitPrice: {
        type: Sequelize.STRING,
      },
      dayEnd: {
        type: Sequelize.STRING,
      },
      dayStart: {
        type: Sequelize.STRING,
      },
      forItemCategory: {
        type: Sequelize.STRING,
      },
      forItemType: {
        type: Sequelize.STRING,
      },
      itemsId: {
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
    await queryInterface.dropTable("items_discounts");
  },
};
