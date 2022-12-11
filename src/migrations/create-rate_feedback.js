"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("rate_feedback", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idfeedback: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      idUserRepFeedback: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      repContent: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      timeRepFeedback: {
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
    await queryInterface.dropTable("rate_feedback");
  },
};
