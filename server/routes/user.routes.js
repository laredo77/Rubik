const express = require("express");
const { addUser, getGameState, getLeaderBoard} = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/", addUser);
userRoutes.get("/gameState", getGameState);
userRoutes.get("/leaderboard", getLeaderBoard);

module.exports = userRoutes;
