const User = require("../dataBase/user");
const { verifyToken } = require("./jwt");

const authMiddleware = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const token = authorization?.split(" ").pop();

  if (token) {
    try {
      const { data } = verifyToken(token);
      const user = await User.findByPk(data.id);
      if (!user) return res.sendStatus(401);
      req.user = user;
      next();
    } catch (e) {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(401);
  }
};

const authApiKey = async (req, res, next) => {
  const API_KEY = req.header("x-api-key");
  if(!API_KEY) {
    return res.sendStatus(401)
  }
  const user = await User.findOne({where: { apiKey: API_KEY } });
  if (user) {
    req.user = user;
    next()
  } else {
    return res.sendStatus(401)
  }
};

const authAdmin = async (req, res,next) => {
  if (req.user.is_admin) {
    next()
  } else {
    res.sendStatus(401)
  }
}

module.exports = { authMiddleware, authApiKey, authAdmin};
