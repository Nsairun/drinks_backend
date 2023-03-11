const express = require('express');
const sequelize = require('../dataBase');
const bcrypt = require("bcrypt")
const {signToken}= require("../services/jwt")
const { authMiddleware } = require("../services/auth");
const User = require('../dataBase/user');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
sequelize.sync()
module.exports = router;

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { emailAddress: username } });
  if (!user) {
    return res.sendStatus(401);
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (err) {
      return res.status(500).send(err);
    }

    if (result) {
      const token = signToken({id: user.id, email: user.emailAddress})
      res.send({user, token});
    } else {
      return res.sendStatus(401);
    }
  });
});

router.get("/current-user", authMiddleware, (req, res) => {
  res.send(req.user);
});

module.exports = router;
