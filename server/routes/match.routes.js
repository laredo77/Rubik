const express = require("express");
const {
    setMatch,
    joinMatch,
    getMatchStatus,
    applyMove,
    getMatchState,
    quitMatch
} = require("../controllers/match.controller");
const matchRoutes = express.Router();

matchRoutes.post("/setMatch", setMatch);
matchRoutes.post("/joinMatch", joinMatch);
matchRoutes.get("/matchStatus", getMatchStatus);
matchRoutes.post("/applyMove", applyMove);
matchRoutes.get("/getMatchState", getMatchState);
matchRoutes.post("/quit", quitMatch);
module.exports = matchRoutes;
