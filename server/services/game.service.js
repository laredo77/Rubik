const database = require("../database");
const {getLevelNumber, getLevelString} = require("../utility/levelUtils");
const {response} = require("express");
const {executePython} = require("../utility/pythonExecuter");
const {generatePassword} = require("../utility/generate_pass");
const {executeQuery} = require("../database");


const getUserAction = async (action) => {
    const scriptFileName = "identify_and_solve.py"
    await executePython(scriptFileName, [action.action]);

    // Open and read the error file
    const fs = require('fs');
    const path = require('path');
    const errorFilePath = path.join('utility', 'messages_to_user.txt');
    fs.readFile(errorFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data)
        return data;
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


const chooseLevel = async (playerLevel) => {
    const levelNumber = getLevelNumber(playerLevel.level);
    const query = `SELECT cube_string FROM level_cube WHERE level_id = (SELECT level_id FROM level WHERE level_id='${levelNumber}' AND is_competition=1)`
    database.connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while selecting level')
        } else {
            const is_competition = true;
            const levelString = getLevelString(results, is_competition);
            console.log("Change level, cube state:", levelString)
            return levelString;
        }
    });
};

const createGame = async (gameDetails) => {
    return new Promise(async (resolve, reject) => {
        console.log("in create game:", gameDetails)
        const selectQuery = `SELECT * FROM multiplayer_games WHERE user_email = ? AND level_id = ?`;
        const selectParams = [gameDetails.user, gameDetails.level];

        let results;
        try {
            results = await executeQuery(selectQuery, selectParams);
        } catch (error) {
            console.error(error);
            console.log("An error occurred while creating/fetching game from database");
            throw error;
        }
        if (results.length === 0) {
            // If game doesn't exist, create a new game
            console.log("Game was not found, creating a new session");

            let password = generatePassword();
            const insertQuery = `INSERT INTO multiplayer_games (level_id, password, user_email) VALUES (?, ?, ?)`;
            const insertParams = [gameDetails.level, password, gameDetails.user];
            try {
                await executeQuery(insertQuery, insertParams);
            } catch (error) {
                console.error(error);
                console.log("An error occurred creating new session");
                const deleteQuery = `DELETE FROM multiplayer_games WHERE level_id = ? AND password = ? AND user_email = ?`;
                const deleteParams = [gameDetails.level, password, gameDetails.user];

                // If there was any error, delete last insert from db
                try {
                    await executeQuery(deleteQuery, deleteParams);
                } catch (error) {
                    console.error(error);
                    throw error;
                }
                throw error;
            }

            console.log("Created new game id");

            // Fetch new game id from database
            const selectQuery3 = `SELECT game_id FROM multiplayer_games WHERE user_email = ? AND level_id = ? AND password = ?`;
            const selectParams3 = [gameDetails.user, gameDetails.level, insertParams[1]];
            let selectResult3;
            try {
                selectResult3 = await executeQuery(selectQuery3, selectParams3);
            } catch (error) {
                console.error(error);
                console.log("An error occurred fetching game id from database");

                const deleteQuery = `DELETE FROM multiplayer_games WHERE level_id = ? AND password = ? AND user_email = ?`;
                const deleteParams = [gameDetails.level, password, gameDetails.user];

                // If there was any error, delete last insert from db
                try {
                    await executeQuery(deleteQuery, deleteParams);
                } catch (error) {
                    console.error(error);
                    throw error;
                }

                throw error;
            }

            const game_id = selectResult3[0].game_id;
            console.log("Fetched new game id");

            // Insert user to game
            const insertQuery1 = `INSERT INTO user_to_game (game_id, user_email) VALUES (?, ?)`;
            const insertParams1 = [game_id, gameDetails.user];


            const insertResult1 = await executeQuery(insertQuery1, insertParams1);

            if (insertResult1.affectedRows > 0) {
                console.log("Created new game successfully");

                const gameDetails = {
                    game_id: game_id,
                    password: password,
                };
                resolve(gameDetails);
            } else {
                console.log("An error occurred adding user to game id");
                const deleteQuery = `DELETE FROM multiplayer_games WHERE level_id = ? AND password = ? AND user_email = ?`;
                const deleteParams = [gameDetails.level, password, gameDetails.user];

                // If there was any error, delete last insert from db
                try {
                    await executeQuery(deleteQuery, deleteParams);
                } catch (error) {
                    console.error(error);
                    throw error;
                }

                throw new Error("Failed to create new game");
            }


        } else {
            // Game exists, fetch user progress in this level
            console.log("Game found");
            let game_id = results[0].game_id;
            let password = results[0].password;

            const selectQuery1 = `SELECT * FROM multiplayer_games WHERE user_email = ? AND level_id = ? AND game_id = ? AND password = ?`;
            const selectParams1 = [gameDetails.user, gameDetails.level, game_id, password];
            let selectResult1;
            try {
                selectResult1 = await executeQuery(selectQuery1, selectParams1);
                console.log(selectResult1);
            } catch (error) {
                console.log("Please check game id or password");
                console.error(error);
                throw error;
            }
            console.log("Fetching game progress");

            const level_id = selectResult1[0].level_id;
            const selectQuery2 = `SELECT cube_id, is_finished FROM user_progress
                                         WHERE game_id = ? AND level_id = ? AND user_email = ?`;

            const selectParams2 = [game_id, level_id, gameDetails.user];
            let selectResult2;
            try {
                selectResult2 = await executeQuery(selectQuery2, selectParams2);
                console.log(selectResult2)
            } catch (error) {
                console.log("Error fetching game progress");
                console.error(error);
                throw error;
            }

            console.log("Last game loaded successfully");
            resolve(selectResult2);
        }
    });
}

const joinGame = async (gameDetails) => {
    const selectQuery = `SELECT * FROM multiplayer_games WHERE game_id = ? AND password = ?`;
    const params = [gameDetails.id, gameDetails.password];
    try {
        const results = await executeQuery(selectQuery, params);
        if (results.length > 0) {
            console.log('Found game, joining...');

            // Insert user to game
            const insertQuery = `INSERT INTO user_to_game (game_id, user_email) VALUES (?, ?)`;
            const insertParams = [gameDetails.id, gameDetails.user_email];

            try {
                await executeQuery(insertQuery, insertParams);
            } catch (error) {
                console.log("Error joining game");
                console.error(error);
                throw error;
            }
            console.log('Success joining game');    //todo take care of duplicated rows - delete user when he leaves game?
            return results[0];
        } else {
            console.log('Did not find game requested or wrong password');
            throw new Error('Game not found or wrong password');
        }
    } catch (error) {
        console.error(error);
        console.log('Error while joining game');
        throw error;
    }
};


module.exports = {
    getUserAction,
    chooseLevel,
    fetchGameState,
    createGame,
    joinGame,
};


