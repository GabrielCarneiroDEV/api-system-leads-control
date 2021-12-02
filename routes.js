const express = require("express");
const { getLeads, createLead } = require("./controllers/leads");
const { register, login } = require("./controllers/users");
const { loginVerify } = require("./middlewares/loginVerify");

const routes = express();


routes.post("/register", register);
routes.post("/login", login);

routes.use(loginVerify);

routes.get("/leads", getLeads);
routes.post("/leads", createLead);


module.exports = routes;