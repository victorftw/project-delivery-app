module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      urlImage: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "url_image",
      },
    },
    {
      timestamps: false,
      tableName: "products",
      sequelize
    }
  );

  return Product;
};
