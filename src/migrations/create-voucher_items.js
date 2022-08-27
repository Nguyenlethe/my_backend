'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('voucher_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      voucherItemsId: {
        type: Sequelize.STRING
      },
      idCreateVoucher: {
        type: Sequelize.STRING
      },
      codeVoucher: {
        type: Sequelize.STRING
      },
      priceLimitVND: {
        type: Sequelize.INTEGER
      },
      priceLimitUSD: {
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
    await queryInterface.dropTable('voucher_items');
  }
};






