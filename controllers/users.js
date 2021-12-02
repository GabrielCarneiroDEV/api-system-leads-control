const knex = require("../databaseConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res
      .status(400)
      .json({ mensagem: "Os campos nome e senha são obrigatórios" });
  }

  try {
    const userExists = await knex("users")
      .select("*")
      .where({ name })
      .first();
    if (userExists) {
      return res.status(400).json({ mensagem: "Usuário já cadastrado" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const registerUser = await knex("users").insert({
      name,
      password: encryptedPassword,
    });

    res.status(200).json({ mensagem: "usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ mensagem: "Os campos nome e senha são obrigatórios" });
  }

  try {
    const user = await knex("users").where({ name }).first();

    if (!user) {
      return res
        .status(400)
        .json({ mensagem: "O usuario não foi encontrado." });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({ mensagem: "Email e senha não conferem." });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "8h",
    });

    return res.status(200).json({ token, id: user.id, name  });
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

module.exports = {
  register,
  login,
};
