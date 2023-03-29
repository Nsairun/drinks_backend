const Ingredient = require("../dataBase/ingredient");


const getAll = async function (req, res) {
    const ingredient = await Ingredient.findAll({include: Drink});
    res.send(ingredient);
};

const createIngredient = async function(req, res) {
    const { Name, description } = req.body;
      if(err) res.status(500).send(err);
      else {
        const ingredient = await Ingredient.create({
          Name, description
        });
        res.send(ingredient);
      }
  };

  const getOneIngredient = async function(req, res) {
    const ingredient = await Ingredient.findByPk(req.params.id, {include: Drink });
    res.send(ingredient);
  };

  const putOneIngredient = async function (req, res) {
    const { Name, description } = req.body;
    if (Name && description) {
      await Ingredient.update(req.body, { where: { id: req.params.id } });
      const ingredient = await Ingredient.findByPk(req.params.id);
      res.send(ingredient);
    } res.send({message: "Validation Error"})
  };

  const patchOneIngredient = async function (req, res) {
    await Ingredient.update(req.body, { where: { id: req.params.id } });
    const ingredient = await Ingredient.findByPk(req.params.id);
    res.send(ingredient);
  };

  const deleteIngredient = async function (req, res) {
    const ingredient = await Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("success");
  };

module.exports = {
    getAll,
    createIngredient,
    getOneIngredient,
    putOneIngredient,
    patchOneIngredient,
    deleteIngredient,
};
