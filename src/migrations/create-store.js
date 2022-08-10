'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('stores', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      manageId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      permission: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nameShop: {
        type: Sequelize.STRING
      },
      addressShop: {
        type: Sequelize.STRING  
      },
      emailShop: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      pay: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      follow: {
        type: Sequelize.INTEGER
      },
      avata: {
        type: Sequelize.STRING
      },
      coverImage: {
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
    await queryInterface.dropTable('stores');
  }
};