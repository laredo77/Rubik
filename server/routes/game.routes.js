const express = require("express");
const {
    uploadImages,
    chooseLevel,
    getGameState,
    postCompScore,
    createGame,
    joinGame
} = require("../controllers/game.controller");
const gameRoutes = express.Router();

// game routes
gameRoutes.post("/upload-images", uploadImages);
gameRoutes.get("/gameState", getGameState);
// old singleplayer routes
gameRoutes.post("/choose-level", chooseLevel);
gameRoutes.post("/create-game", createGame);
gameRoutes.post("/join-game", joinGame);

// competition routes
gameRoutes.post("/compScore", postCompScore);


module.exports = gameRoutes;
