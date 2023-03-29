const Category= require("../dataBase/category");
const Drink = require("../dataBase/drink");


const getAllCategories = async function (req, res) {
    const category= await Category.findAll({include: Drink});
    res.send(category);
};

const createCategory = async function(req, res) {
    const { Name, description } = req.body;
      if(err) res.status(500).send(err);
      else {
        const category= await Category.create({
          Name, description
        });
        res.send(category);
      }
  };

  const getOneCategory= async function(req, res) {
    const category= await Category.findByPk(req.params.id, {include: Glass});
    res.send(category);
  };

  const putOneCategory= async function (req, res) {
    const { name, description } = req.body;
    if (name && description) {
      await Category.update(req.body, { where: { id: req.params.id } });
      const category= await Category.findByPk(req.params.id);
      res.send(category);
    } res.send({message: "Validation Error"})
  };

  const patchOneCategory= async function (req, res) {
    await category.update(req.body, { where: { id: req.params.id } });
    const category= await Category.findByPk(req.params.id);
    res.send(category);
  };

  const deleteCategory= async function (req, res) {
    const category= await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("success");
  };

module.exports = {
    getAllCategories,
    createCategory,
    getOneCategory,
    putOneCategory,
    patchOneCategory,
    deleteCategory,
};
