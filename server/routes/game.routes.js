const express = require("express");
const { uploadImages, chooseLevel, postCompScore } = require("../controllers/game.controller");
const gameRoutes = express.Router();

// game routes
gameRoutes.post("/upload-images", uploadImages);

// old singleplayer routes
gameRoutes.post("/choose-level", chooseLevel);

// competition routes
gameRoutes.post("/compScore", postCompScore);


module.exports = gameRoutes;
