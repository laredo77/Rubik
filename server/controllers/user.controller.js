const userService = require("../services/user.service.js");

const addUser = async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send("User did not added");
  }
};

const getGameState = async (req, res) => {
  try {
    const gameState = await userService.fetchGameState(req.query);
    res.send(gameState);
  } catch (error) {
    console.log(error);
    res.status(401).send("couldn't fetch game state from DB");
  }
};

module.exports = {
  addUser,
  getGameState,
};
