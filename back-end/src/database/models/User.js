module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true, 
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'customer'
      },
    },
    {
      timestamps: false,
      tableName: "users",
    }
  );

  User.associate = ({ Sale }) => {
    User.hasMany(Sale, {
      as: "seller_id",
      foreignKey: "sellerId",
    });

    User.hasMany(Sale, {
      as: "user_id",
      foreignKey: "userId",
    });
  };

  return User;
};
