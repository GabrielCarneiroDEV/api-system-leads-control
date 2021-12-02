const express = require("express");
const app = require("./server");
const routes = express();


routes.get("/", (req, res) => {
    res.json("Testando")
})

module.exports = routes;