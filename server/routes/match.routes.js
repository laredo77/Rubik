// File: matchRoutes.js
// Description: This file defines the routes for match-related operations.

const express = require("express");
const {
    setMatch,
    joinMatch,
    getMatchStatus,
    applyMove,
    getMatchState,
    quitMatch,
    getInitMatchMoves
} = require("../controllers/match.controller");

const matchRoutes = express.Router();

// Route: POST /setMatch
// Description: Sets up a new match.
matchRoutes.post("/setMatch", setMatch);

// Route: POST /joinMatch
// Description: Joins an existing match.
matchRoutes.post("/joinMatch", joinMatch);

// Route: GET /matchStatus
// Description: Retrieves the status of a match.
matchRoutes.get("/matchStatus", getMatchStatus);

// Route: POST /applyMove
// Description: Applies a move to the match.
matchRoutes.post("/applyMove", applyMove);

// Route: GET /getMatchState
// Description: Retrieves the current state of the match.
matchRoutes.get("/getMatchState", getMatchState);

// Route: GET /getInitMatchMoves
// Description: Retrieves the initial match moves for a given level.
matchRoutes.get("/getInitMatchMoves", getInitMatchMoves);

// Route: POST /quit
// Description: Quits the match.
matchRoutes.post("/quit", quitMatch);

module.exports = matchRoutes;
