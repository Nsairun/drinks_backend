const Drink = require("../dataBase/drink")
const User = require("../dataBase/user");
const bcrypt = require ("bcrypt")
const uuid = require ("uuid");
const { SALT_ROUNDS } = require("../services/constant");


const getAll = async function (req, res) {
    const user = await User.findAll({ include: Drink});
    res.send(user);
};

const createUser = function(req, res) {
    const { firstName, lastName, emailAddress, phone, password } = req.body;
    bcrypt.hash(password, SALT_ROUNDS, async function(err, hash) {
      if(err) res.status(500).send(err);
      else {
        const user = await User.create({
          firstName,
          lastName,
          emailAddress,
          phone,
          password: hash,
          apiKey: uuid.v4(),
        });
        res.send(user);
      }
    });
  };

  const getOneUser = async function(req, res) {
    const user = await User.findByPk(req.params.id, {include: Drink });
    res.send(user);
  };

  const putOneUser = async function (req, res) {
    const { firstName, lastName, email, phone, password } = req.body;
    if (firstName && lastName && email && phone && password) {
      await User.update(req.body, { where: { id: req.params.id } });
      const user = await User.findByPk(req.params.id);
      res.send(user);
    } res.send({message: "Validation Error"})
  };

  const patchOneUser = async function (req, res) {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.send(user);
  };

  const deleteUser = async function (req, res) {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("success");
  };

module.exports = {
    getAll,
    createUser,
    getOneUser,
    putOneUser,
    patchOneUser,
    deleteUser,
};
