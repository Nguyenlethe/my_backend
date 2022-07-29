'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('items_size_amount', {

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
      typeSize: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER  
      },
      dateCreate: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('items_size_amount');
  }
};