// File: gameRoutes.js
// Description: This file defines the routes for game-related operations.

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

// Route: POST /upload-images
// Description: Handles image uploads for the Mosaic functionality.
gameRoutes.post("/upload-images", uploadImages);

// Route: POST /gameState
// Description: Retrieves the game state for the Mosaic functionality.
gameRoutes.post("/gameState", getGameState);

// Route: POST /create-game
// Description: Creates a new game for the Mosaic functionality.
gameRoutes.post("/create-game", createGame);

// Route: POST /join-game
// Description: Allows a user to join an existing game for the Mosaic functionality.
gameRoutes.post("/join-game", joinGame);

// Route: POST /mark-solved
// Description: Marks a game as solved for the Mosaic functionality.
gameRoutes.post("/mark-solved", markSolved);

// Routes for competition functionality

// Route: POST /compScore
// Description: Handles competition scores for the competition functionality.
gameRoutes.post("/compScore", postCompScore);

module.exports = gameRoutes;