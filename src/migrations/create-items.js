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
      discount: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      newPrice: {
        type: Sequelize.INTEGER
      },
      dateCreate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updateTime: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items');
  }
};