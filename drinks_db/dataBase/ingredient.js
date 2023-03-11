const {DataTypes} = require("sequelize");
const sequelize = require(".")

const Ingredient = sequelize.define("ingredient", { 
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
       },
    name: {
        type: DataTypes.STRING,
       },
    description: {
        type: DataTypes.STRING,
       },
  
},
{
  timestamps: true,
  paranoid: true,
},
);

module.exports = Ingredient;