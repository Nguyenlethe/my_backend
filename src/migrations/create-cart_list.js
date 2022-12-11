"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cart_lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemsId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      itemsName: {
        type: Sequelize.STRING,
      },
      itemsDetail: {
        type: Sequelize.STRING,
      },
      itemsNumber: {
        type: Sequelize.INTEGER,
      },
      itemsPrice: {
        type: Sequelize.INTEGER,
      },
      image: {
        type: Sequelize.STRING,
      },
      imageLink: {
        type: Sequelize.STRING,
      },
      itemsColor: {
        type: Sequelize.STRING,
      },
      itemsSize: {
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
    await queryInterface.dropTable("cart_lists");
  },
};
