const express = require("express");
const userRoutes = require("./user.routes");
const singlePlayerRoutes = require("./singleplayer.routes");
const multiPlayerRoutes = require("./multiplayer.routes");

const router = express.Router();
router.use("/user", userRoutes);
// router.use("/singleplayer", singlePlayerRoutes);
// router.use("/multiplayer", multiPlayerRoutes);

module.exports = router;
