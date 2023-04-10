const express = require("express");
const { setMatch, getMatchStatus, applyMove } = require("../controllers/match.controller");
const matchRoutes = express.Router();

matchRoutes.post("/setMatch", setMatch);
matchRoutes.get("/matchStatus", getMatchStatus);
matchRoutes.post("/applyMove", applyMove);

module.exports = matchRoutes;
