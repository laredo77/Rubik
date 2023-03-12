const express = require("express");
const { addUser } = require("../controllers/user.controller");
const userRoutes = express.Router();

userRoutes.post("/", addUser);

module.exports = userRoutes;
