const express = require("express");
const { getLeads, createLead, editLead, deleteLead, updatePosition } = require("./controllers/leads");
const { register, login } = require("./controllers/users");
const { loginVerify } = require("./middlewares/loginVerify");

const routes = express();


routes.post("/register", register);
routes.post("/login", login);

routes.use(loginVerify);

routes.get("/leads", getLeads);
routes.post("/leads", createLead);
routes.put("/leads/:id", editLead);
routes.delete("/leads/:id", deleteLead);
routes.put("/updatePosition/:id", updatePosition )


module.exports = routes;