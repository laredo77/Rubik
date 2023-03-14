const express = require("express");
const { uploadImages } = require("../controllers/game.controller");
const gameRoutes = express.Router();

gameRoutes.post("/upload-images", uploadImages);

module.exports = gameRoutes;
