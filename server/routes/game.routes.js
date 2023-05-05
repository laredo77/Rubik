const express = require("express");
const {uploadImages, chooseLevel, getGameState, postCompScore, createGame} = require("../controllers/game.controller");
const gameRoutes = express.Router();

// game routes
gameRoutes.post("/upload-images", uploadImages);
gameRoutes.get("/gameState", getGameState);
// old singleplayer routes
gameRoutes.post("/choose-level", chooseLevel);
gameRoutes.post("/create-game", createGame);

// competition routes
gameRoutes.post("/compScore", postCompScore);


module.exports = gameRoutes;
