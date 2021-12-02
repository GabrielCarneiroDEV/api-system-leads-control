const jwt = require("jsonwebtoken");
const knex = require("../databaseConnection");

const loginVerify = async (req, res, next) => {

    const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: "não autorizado" });
  }


  try {
    const token = authorization.replace('Bearer ', '').trim();

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const findUser = await knex('users').where({ id }).first();

    if (!findUser) {
        return res.status(404).json({ mensagem: 'Usuario não encontrado' });
    }

    const { password:_, ...user } = findUser;

    req.user = user;

    next();
      
  } catch (error) {
     return res.status(400).json({mensagem: error.message})
  }
};

module.exports = {
    loginVerify
}