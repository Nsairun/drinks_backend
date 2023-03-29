const Drink= require("../dataBase/drink");
const Glass = require("../dataBase/glass");


const getAllDrinks = async function (req, res) {
    const drink= await Drink.findAll();
    res.send(drink);
};

const createDrink= async function(req, res) {
    const { Name, description } = req.body;
      if(err) res.status(500).send(err);
      else {
        const drink= await Drink.create({
          Name, description
        });
        res.send(drink);
      }
  };

  const getOneDrink= async function(req, res) {
    const drink= await Drink.findByPk(req.params.id, {include: Glass});
    res.send(drink);
  };

  const putOneDrink= async function (req, res) {
    const { name, description, imageurl, glass } = req.body;
    if (name && description && imageurl && glass) {
      await Drink.update(req.body, { where: { id: req.params.id } });
      const drink= await Drink.findByPk(req.params.id);
      res.send(drink);
    } res.send({message: "Validation Error"})
  };

  const patchOneDrink= async function (req, res) {
    await Drink.update(req.body, { where: { id: req.params.id } });
    const drink= await Drink.findByPk(req.params.id);
    res.send(drink);
  };

  const deleteDrink= async function (req, res) {
    const drink= await Drink.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("success");
  };

module.exports = {
    getAllDrinks,
    createDrink,
    getOneDrink,
    putOneDrink,
    patchOneDrink,
    deleteDrink,
};
