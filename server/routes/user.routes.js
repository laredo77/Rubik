const express = require("express");
const { addUser, getLeaderBoard } = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/", addUser);
userRoutes.get("/leaderboard", getLeaderBoard);

module.exports = userRoutes;
