//const userDB = require("../repository/userDOAService.js");

const addUser = async (user) => {
  console.log("should add to db the user: ", user.email);
  return { email: "user-added" };
  // const userFromDB = await getUser(user.id);
  // if (userFromDB.length) {
  //   return userFromDB;
  // } else {
  //   const addedUser = await userDB.addUser(user);
  //   return addedUser;
  // }
};

const fetchGameState = async (gameDetails) => {
  // 1. check if gameDetails.manager in DB, if no, add him and new level
  // 2. if yes, check if level is open, if no open level
  // 3. if yes, send gameState
  return { gameState: "gameState" };
  // const userFromDB = await getUser(user.id);
  // if (userFromDB.length) {
  //   return userFromDB;
  // } else {
  //   const addedUser = await userDB.addUser(user);
  //   return addedUser;
  // }
};

module.exports = {
  addUser,
  fetchGameState,
};
