const express = require("express");
const Drink = require("../dataBase/drink")
const User = require("../dataBase/user");
const bcrypt = require ("bcrypt")
const uuid = require ("uuid");
const { SALT_ROUNDS } = require("../services/constant");
const router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res) {
  const user = await User.findAll({ include: Drink});
  res.send(user);
});
router.post("/", async function (req, res) {
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
});
router.get("/:id", async function (req, res) {
  const user = await User.findByPk(req.params.id);
  res.send(user);
});
router.put("/:id", async function (req, res) {
  const { firstName, lastName, email, phone, password } = req.body;
  if (firstName && lastName && email && phone && password) {
    await User.update(req.body, { where: { id: req.params.id } });
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } res.send({message: "Validation Error"})
});
router.patch("/:id", async function (req, res) {
  await User.update(req.body, { where: { id: req.params.id } });
  const user = await User.findByPk(req.params.id);
  res.send(user);
});
router.delete("/:id", async function (req, res) {
  const user = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.send("success");
});

module.exports = router;
