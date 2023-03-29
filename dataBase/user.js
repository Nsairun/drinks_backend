const { DataTypes } = require("sequelize");
const sequelize = require(".");

const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,

    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
    },
    phone: DataTypes.STRING,
    apiKey: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = User;
