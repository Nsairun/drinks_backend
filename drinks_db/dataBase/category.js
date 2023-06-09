const {DataTypes} = require("sequelize");
const sequelize = require(".")

const Category = sequelize.define("category", {
    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
        allowNull: false,
        primaryKey: true,
       },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
       },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
       },
  },
{
  timestamps: true,
  paranoid: true,
},
);

module.exports = Category