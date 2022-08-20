'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items_infos', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemsId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      describeHtmlEn: {
        type: Sequelize.STRING
      },
      describeTextEn: {
        type: Sequelize.STRING
      },
      describeHtmlVi: {
        type: Sequelize.STRING  
      },
      describeTextVi: {
        type: Sequelize.STRING
      },
      trademark: {
        type: Sequelize.STRING
      },
      production: {
        type: Sequelize.STRING
      },
      sentFrom: {
        type: Sequelize.STRING
      },
      texture: {
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
    await queryInterface.dropTable('items_infos');
  }
};