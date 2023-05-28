// File: index.routes.js
// Description: This file defines the main router for the API endpoints.

const express = require("express");
const userRoutes = require("./user.routes");
const gameRoutes = require("./game.routes");
const matchRoutes = require("./match.routes");

const router = express.Router();

// Route: /user
// Description: Routes related to user operations.
router.use("/user", userRoutes);

// Route: /game
// Description: Routes related to game operations.
router.use("/game", gameRoutes);

// Route: /match
// Description: Routes related to match operations.
router.use("/match", matchRoutes);

module.exports = router;
