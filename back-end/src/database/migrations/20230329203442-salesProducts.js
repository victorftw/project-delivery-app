'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'sale_id',
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'product_id',
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales_products');
  },
};
