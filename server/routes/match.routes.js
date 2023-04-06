const express = require("express");
const { setMatch } = require("../controllers/match.controller");
const matchRoutes = express.Router();

matchRoutes.post("/setMatch", setMatch);

module.exports = matchRoutes;
