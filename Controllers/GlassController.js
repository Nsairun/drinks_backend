const Drink = require("../dataBase/drink");
const Glass = require("../dataBase/glass");


const getAllGlasses = async function (req, res) {
    const glass = await Glass.findAll({include: Drink});
    res.send(glass);
};

const createGlass = async function(req, res) {
    const { Name} = req.body;
      if(err) res.status(500).send(err);
      else {
        const glass = await Glass.create({Name});
        res.send(glass);
      }
  };

  const getOneGlass = async function(req, res) {
    const glass = await Glass.findByPk(req.params.id, {include: Drink });
    res.send(glass);
  };

  const putOneGlass = async function (req, res) {
    const {Name} = req.body;
    if (Name) {
      await Glass.update(req.body, { where: { id: req.params.id } });
      const glass = await Glass.findByPk(req.params.id);
      res.send(glass);
    } res.send({message: "Validation Error"})
  };

  const patchOneGlass = async function (req, res) {
    await Glass.update(req.body, { where: { id: req.params.id } });
    const glass = await Glass.findByPk(req.params.id);
    res.send(glass);
  };

  const deleteGlass = async function (req, res) {
    const glass = await Glass.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("success");
  };

module.exports = {
    getAllGlasses,
    createGlass,
    getOneGlass,
    putOneGlass,
    patchOneGlass,
    deleteGlass,
};
