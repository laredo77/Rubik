const express = require("express");
const {setMatch, getMatchStatus, applyMove, getMatchState, quitMatch} = require("../controllers/match.controller");
const matchRoutes = express.Router();

matchRoutes.post("/setMatch", setMatch);
matchRoutes.get("/matchStatus", getMatchStatus);
matchRoutes.post("/applyMove", applyMove);
matchRoutes.get("/getMatchState", getMatchState);
matchRoutes.post("/quit", quitMatch);
module.exports = matchRoutes;
