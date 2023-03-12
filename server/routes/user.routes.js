const express = require("express");
const { addUser, getGameState } = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/", addUser);
userRoutes.get("/gameState", getGameState);

module.exports = userRoutes;
