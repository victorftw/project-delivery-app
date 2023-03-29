module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: {
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false,
        field: "sale_id",
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: true, 
        allowNull: false,
        field: "product_id",
      },
      quantity: {
        type: DataTypes.INTEGER, 
        allowNull: false
      }
    },
    {
      timestamps: false,
      tableName: "sales_products",
      sequelize,
    }
  );

  SaleProduct.associate = ({ Sale, Product}) => {
    Sale.belongsToMany(Product, {
      as: "products",
      through: SaleProduct,
      foreignKey: "saleId",
      otherKey: "productId"
    });

    Product.belongsToMany(Sale, {
      as: "sales",
      through: SaleProduct,
      foreignKey: "productId",
      otherKey: "saleId"
    });
  }

  return SaleProduct;
};
