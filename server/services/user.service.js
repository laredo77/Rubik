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
    // get the user's progress for the given level from the database
    console.log(gameDetails.manager, gameDetails.level);
    const query = `SELECT lc.* FROM level_cube lc INNER JOIN user_progress up ON lc.cube_id = up.cube_id WHERE lc.level_id = '${gameDetails.level}' AND up.user_email = '${gameDetails.manager}'`;
    database.connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while getting the user progress');
        } else {
            //todo need to return also cube_picture of each cube
            const is_competition = false;
            const levelsString = getLevelString(results, is_competition);
            console.log("List of level cubes:", levelsString)
        }
    });

}

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
