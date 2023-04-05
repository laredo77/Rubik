const database = require("../database");
const {response} = require("express");
const {getLevelString} = require("../utility/levelUtils");

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
    console.log("$$$$$$$$$$$$$$$$$$$$")
    // 1. check if gameDetails.manager in DB, if no, add him and new level
    // 2. if yes, check if level is open, if no open level
    // 3. if yes, send gameState
    // return {gameState: "gameState"};


    try {
        // get the user's progress for the given level from the database
        console.log(gameDetails.manager, gameDetails.level);//todo maybe change from manager to email?
        //todo define each level unique name?
        const query = `SELECT * FROM user_progress WHERE user_email = '${gameDetails.manager}' AND level_id = '${gameDetails.level}'`;
        database.connection.query(query, (error, results) => {
            if (error) {
                console.error(error);
                console.log('An error occurred while getting the user progress');
            } else {
                console.log("##############################")
                console.log("gamedetails:", gameDetails, "results:", results);
                // if the user's progress for the level exists in the database, update the gameDetails object
                // gameDetails.progress = {
                //     cubeId: results.cube_id,
                //     isFinished: row.is_finished,
                // };
            }
        });
        //     const params = [user.email, level.level_id];
        //     const [row] = await executeQuery(query, params);
        //
        //
        //     if (row) {
        //
        //     }
        //
    } catch (error) {
        // handle any errors that occur while retrieving the user's progress from the database
        gameDetails.isError = true;
        gameDetails.errorMsg = error.message;
    }
    //
    // gameDetails.isLoading = false;
    // return gameDetails;
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
