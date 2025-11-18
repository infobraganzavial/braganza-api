const SequelizeService = require('../services/sequelizeService');
const { User } = require('../models')
const service = new SequelizeService(User);
const { Op } = require("sequelize");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  const { username, email } = req.body;
  // Username
  try {
    let user = await service.findOne({ where: { [Op.or]: [ { username }, { email } ] }, raw: true });
    if (user && user.username === username) {
      res.status(400).send({ data: "El nombre de usuario ya está en uso", err: true });
      return;
    }
    if (user && user.email === email) {
      res.status(400).send({ data: "Correo electrónico ya está en uso", err: true });
      return;
    }
    next();
  } catch (error) {
    console.log('err', error);
    res.status(500).json({ data: error, err: true });
  }
};

const verifySignUp = { checkDuplicateUsernameOrEmail };

module.exports = verifySignUp;