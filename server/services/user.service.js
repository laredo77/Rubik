const database = require("../database");
const {response} = require("express");

const addUser = async (user) => {
    const query1 = `SELECT * FROM user where user_email='${user.email}'`
    database.connection.query(query1, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while checking the user')
        } else if (results.length > 0) {
            console.log('User already exists')
        } else {
            const query2 = `INSERT INTO rubik_cube2.user (user_email) VALUES ('${user.email}')`;
            database.connection.query(query2, function (error, results, fields) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("User added successfully:", user);
                }
            });
        }
    });

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
    const query = `SELECT * FROM user`;

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
        //todo fix picture rendering
        // User_Picture: Buffer.from(result.user_picture).toString("base64"),
        Email: result.user_email,
        Score: result.user_score
    }));
};


module.exports = {
    addUser,
    fetchGameState,
    buildLeaderboard,
};
