// File: user.routes.js
// Description: This file defines the user routes for the API.

const express = require("express");
const {addUser, getLeaderBoard} = require("../controllers/user.controller");
const userRoutes = express.Router();

// Route: POST /
// Description: Add a new user.
userRoutes.post("/", addUser);

// Route: GET /leaderboard
// Description: Get the leaderboard.
userRoutes.get("/leaderboard", getLeaderBoard);

module.exports = userRoutes;
