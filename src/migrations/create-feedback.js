

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedback', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemsId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idShop: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING  
      },
      timeFeedback: {
        type: Sequelize.STRING
      },
      start: {
        type: Sequelize.INTEGER
      },
      dateCreate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feedback');
  }
};