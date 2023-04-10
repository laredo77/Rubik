const express = require("express");
const userRoutes = require("./user.routes");
const gameRoutes = require("./game.routes");
const matchRoutes = require("./match.routes");
const singlePlayerRoutes = require("./singleplayer.routes");

const router = express.Router();
router.use("/user", userRoutes);
router.use("/game", gameRoutes);
router.use("/match", matchRoutes);
router.use("/singleplayer", singlePlayerRoutes);
// router.use("/multiplayer", multiPlayerRoutes);

module.exports = router;
