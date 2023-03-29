module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "seller_id",
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        field: "total_price",
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "delivery_address",
      },
      deliveryNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "delivery_number",
      },
      saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "sale_date",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendente",
        field: "status",
      },
    },
    {
      timestamps: false,
      tableName: "sales",
      sequelize
    }
  );

  Sale.associate = ({ User, }) => {
    Sale.belongsTo(User, {
      as: "user",
      foreignKey: "userId",
    });

    Sale.belongsTo(User, {
      as: "seller",
      foreignKey: "sellerId",
    });
  }
  return Sale;
};
