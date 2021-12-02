const express = require("express");
const { register, login } = require("./controllers/users");

const routes = express();


routes.get("/register", register);
routes.get("/login", login);

module.exports = routes;