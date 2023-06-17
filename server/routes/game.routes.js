const express = require("express");
const {
    uploadImages,
    getGameState,
    postCompScore,
    createGame,
    joinGame,
    markSolved,
} = require("../controllers/game.controller");
const gameRoutes = express.Router();

// Routes for Mosaic functionality
gameRoutes.post("/upload-images", uploadImages);
gameRoutes.post("/gameState", getGameState);
gameRoutes.post("/create-game", createGame);
gameRoutes.post("/join-game", joinGame);
gameRoutes.post("/mark-solved", markSolved);

// Routes for competition functionality
gameRoutes.post("/compScore", postCompScore);

module.exports = gameRoutes;
