'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('star_shops', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        allowNull: false,
        type: Sequelize.STRING
      },
      itemsId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      1: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      2: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      3: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      4: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      5: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('star_shops');
  }
};