const {DataTypes} = require("sequelize");
const sequelize = require(".")


const Drink = sequelize.define("drink", {
    id: { 
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    Image_url: DataTypes.STRING,
    glass: DataTypes.STRING,
},
{
    timestamps: true,
    paranoid: true,
},);

module.exports = Drink;