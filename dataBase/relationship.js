const drink = require("./drink");
const user = require("./user");
const category = require("./category");
const ingredient = require("./ingredient");
const glass = require("./glass");
const sequelize = require(".");

function Relate() {
    sequelize.sync()
    user.hasMany(drink);
    drink.belongsTo(user);

    category.belongsToMany(drink, { through: "drinks_categories"});
    drink.belongsToMany(category, {through: "drinks_categories"});

    drink.belongsToMany(ingredient, {through: "drinks_ingredients"});
    ingredient.belongsToMany(drink, {through: "drinks_ingredients"});
    drink.belongsToMany(glass, {through: "drinks_glasses"});
    glass.belongsToMany(drink, {through: "drinks_glasses"});

    sequelize.sync()
}

module.exports = Relate;