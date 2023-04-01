const database = require("../database");
const {response} = require("express");

const addUser = async (user) => {
    console.log("should add to db the user: ", user.email);
    return {email: "user-added"};
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
    return {gameState: "gameState"};
    // const userFromDB = await getUser(user.id);
    // if (userFromDB.length) {
    //   return userFromDB;
    // } else {
    //   const addedUser = await userDB.addUser(user);
    //   return addedUser;
    // }
};

const buildLeaderboard = async () => {
    // Send a query to retrieve the required data
    const query = "SELECT * FROM users";

    // Create a Promise that wraps the database query
    const results = await new Promise((resolve, reject) => {
        database.connection.query(query, function (error, results, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });

    // Return the formatted data
    return results.map(result => ({
        User_Picture: Buffer.from(result.User_Picture).toString("base64"),
        Email: result.Email,
        Score: result.Score
    }));
};


module.exports = {
    addUser,
    fetchGameState,
    buildLeaderboard,
};
