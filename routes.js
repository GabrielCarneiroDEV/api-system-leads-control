const express = require("express");
const { register, login } = require("./controllers/users");

const routes = express();


routes.post("/register", register);
routes.post("/login", login);

module.exports = routes;