'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('manage_oders', {
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
      userGuestId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      idShop: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      itemsNumber: {
        type: Sequelize.INTEGER  
      },
      timeReceived: {
        type: Sequelize.STRING
      },
      timeCreate: {
        type: Sequelize.STRING
      },
      priceShip: {
        type: Sequelize.INTEGER
      },
      voucherApply: {
        type: Sequelize.STRING
      },
      voucherApplyTow: {
        type: Sequelize.INTEGER
      },
      status: {
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
    await queryInterface.dropTable('manage_oders');
  }
};