const express = require("express");
const {chooseLevel} = require("../controllers/singleplayer.controller");
const singlePlayerRoutes = express.Router();

singlePlayerRoutes.post("/choose-level", chooseLevel);

module.exports = singlePlayerRoutes;
