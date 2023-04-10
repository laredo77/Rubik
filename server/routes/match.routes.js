const express = require("express");
const { setMatch, getMatchStatus } = require("../controllers/match.controller");
const matchRoutes = express.Router();

matchRoutes.post("/setMatch", setMatch);
matchRoutes.get("/matchStatus", getMatchStatus);

module.exports = matchRoutes;
