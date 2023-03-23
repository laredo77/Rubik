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

const buildLeaderboard = async (data) => {
  data = {
    userID: "44e1f164-831d-4732-8e49-0cda24369000",
    userName: "Picca",
    picture:
        "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/8/89/Pikachu.jpg",
    score: 17300,
  }
  console.log("should take all users from leaderboard with their score and pic", data);
  return { picture: data.picture, userName: data.userName, score: data.score };
};

module.exports = {
  addUser,
  fetchGameState,
  buildLeaderboard,
};
