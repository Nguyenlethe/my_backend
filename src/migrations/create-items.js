'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idItems: {
        allowNull: false,
        type: Sequelize.STRING
      },
      idShop: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      manageId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING  
      },
      discounts: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      nameEn: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      priceUS: {
        type: Sequelize.INTEGER
      },
      newPrice: {
        type: Sequelize.INTEGER
      },
      newPriceUS: {
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
    await queryInterface.dropTable('items');
  }
};