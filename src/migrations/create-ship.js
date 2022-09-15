

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ships', {
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
      category: {
        allowNull: false,
        type: Sequelize.STRING
      },
      categoryType: {
        allowNull: false,
        type: Sequelize.STRING
      },
      priceShipVN: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      priceShipUS: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      province: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('ships');
  }
};