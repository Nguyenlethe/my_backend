"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vouchers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idVoucher: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idUserCreate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      codeVocher: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      limitVn: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      limitUs: {
        allowNull: false,
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
    await queryInterface.dropTable("vouchers");
  },
};
