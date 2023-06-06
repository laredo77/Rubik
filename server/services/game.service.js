const database = require("../database");
const {getLevelNumber, getLevelString, calculateScore} = require("../utility/levelUtils");
const {response} = require("express");

const {executePythonFile} = require("../utility/pythonExecuter");
const {generatePassword} = require("../utility/generate_pass");
const {executeQuery, executeTransaction} = require("../database");


const getUserAction = async (action) => {
    const scriptFileName = "identify_and_solve.py";
    await executePythonFile(scriptFileName, [action.action]);

    // Open and read the error file
    const fs = require('fs');
    const path = require('path');
    const errorFilePath = path.join('utility', 'messages_to_user.txt');

    return new Promise((resolve, reject) => {
        fs.readFile(errorFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};


const fetchGameState = async (gameDetails) => {
    // Find game manager and level id
    const selectQuery = `SELECT user_email, level_id FROM multiplayer_games WHERE game_id = ?`;
    const selectParams = [gameDetails.gameId];
    let selectResult;
    try {
        selectResult = await executeQuery(selectQuery, selectParams);
    } catch (error) {
        console.error(error);
        console.log('An error occurred while updating the game state');
    }
    const levelId = selectResult[0].level_id;

    // Find all users in game
    const selectQuery1 = `SELECT user_email FROM user_to_game WHERE game_id = ?`;
    const selectParams1 = [gameDetails.gameId];
    try {
        selectResult = await executeQuery(selectQuery1, selectParams1);
    } catch (error) {
        console.error(error);
        console.log('An error occurred while updating the game state: finding manager');
    }

    // Extract user_emails from the selectResult
    const userEmails = selectResult.map(row => row.user_email);

    // Unify all users progress to one
    let unifiedProgress = []
    for (const user of userEmails) {
        // Fetch this user progress in this game and level
        const selectQuery2 = `SELECT cube_id, is_finished FROM user_progress 
                                     WHERE user_email = ? AND level_id = ? AND game_id = ?`;
        const selectParams2 = [user, levelId, gameDetails.gameId];
        try {
            selectResult = await executeQuery(selectQuery2, selectParams2);
        } catch (error) {
            console.error(error);
            console.log('An error occurred while updating the game state: fetching', user, 'progress');
        }
        const userProgress = selectResult.map(row => {
            return {
                cube_id: row.cube_id,
                is_finished: row.is_finished,
            }
        });
        unifiedProgress = unifiedProgress.concat(userProgress);
    }
    // Remove duplicates based on cube_id and is_finished properties
    unifiedProgress = unifiedProgress.reduce((accumulator, item) => {
        const found = accumulator.some(obj => obj.cube_id === item.cube_id && obj.is_finished === item.is_finished);
        if (!found) {
            accumulator.push(item);
        }
        return accumulator;
    }, []);

    // Update each user update missing progress in DB
    const queries = [];
    const tempParams = [];
    for (const user of userEmails) {
        for (const cube of unifiedProgress) {
            const selectQuery = `SELECT * FROM user_progress WHERE user_email = ? AND level_id = ? AND cube_id = ? AND game_id = ?`;
            const selectParams = [user, levelId, cube.cube_id, gameDetails.gameId];
            const insertQuery = `INSERT INTO user_progress (user_email, level_id, cube_id, is_finished, game_id) 
                          VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE is_finished = ?`;

            // Check if user has already finished this cube
            const selectResult = await executeQuery(selectQuery, selectParams);
            const selectParamsString = JSON.stringify(selectParams);
            const isParamExists = tempParams.some(param => JSON.stringify(param) === selectParamsString);

            if (selectResult.length === 0 && !isParamExists) {
                const insertParams = [user, levelId, cube.cube_id, cube.is_finished, gameDetails.gameId, cube.is_finished];
                tempParams.push(selectParams);
                queries.push({query: insertQuery, params: insertParams});
            }
        }
    }

    try {
        await executeTransaction(queries);
    } catch (error) {
        console.error(error);
        console.log('An error occurred while updating the game state. Transaction rolled back.');
    }
    return ({gameId: gameDetails.gameId, gameState: unifiedProgress});
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
        const selectQuery = `SELECT * FROM multiplayer_games WHERE user_email = ? AND level_id = ?`;
        const selectParams = [gameDetails.manager, gameDetails.level_id];

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
            const insertParams = [gameDetails.level_id, password, gameDetails.manager];
            try {
                await executeQuery(insertQuery, insertParams);
            } catch (error) {
                console.error(error);
                console.log("An error occurred creating new session");
                const deleteQuery = `DELETE FROM multiplayer_games WHERE level_id = ? AND password = ? AND user_email = ?`;
                const deleteParams = [gameDetails.level_id, password, gameDetails.manager];

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
            const selectParams3 = [gameDetails.manager, gameDetails.level_id, insertParams[1]];
            let selectResult3;
            try {
                selectResult3 = await executeQuery(selectQuery3, selectParams3);
            } catch (error) {
                console.error(error);
                console.log("An error occurred fetching game id from database");

                const deleteQuery = `DELETE FROM multiplayer_games WHERE level_id = ? AND password = ? AND user_email = ?`;
                const deleteParams = [gameDetails.level_id, password, gameDetails.manager];

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
            const insertParams1 = [game_id, gameDetails.manager];


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
                const deleteParams = [gameDetails.level_id, password, gameDetails.manager];

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
            const selectParams1 = [gameDetails.manager, gameDetails.level_id, game_id, password];
            let selectResult1;
            try {
                selectResult1 = await executeQuery(selectQuery1, selectParams1);
            } catch (error) {
                console.log("Please check game id or password");
                console.error(error);
                throw error;
            }
            console.log("Fetching game progress");

            const level_id = selectResult1[0].level_id;
            const selectQuery2 = `SELECT cube_id, is_finished FROM user_progress
                                         WHERE game_id = ? AND level_id = ? AND user_email = ?`;

            const selectParams2 = [game_id, level_id, gameDetails.manager];
            let selectResult2;
            try {
                selectResult2 = await executeQuery(selectQuery2, selectParams2);
            } catch (error) {
                console.log("Error fetching game progress");
                console.error(error);
                throw error;
            }

            console.log("Last game loaded successfully");
            resolve({game_id: game_id, password: password, cubes: selectResult2})
        }
    });
}

const joinGame = async (gameDetails) => {
    const game_id = gameDetails.game_id;
    const password = gameDetails.password;
    const selectQuery = `SELECT * FROM multiplayer_games WHERE game_id = ? AND password = ?`;
    const params = [game_id, password];
    try {
        const results = await executeQuery(selectQuery, params);
        if (results.length > 0) {
            console.log('Found game, joining...');

            const level_id = results[0].level_id;
            const game_manager = results[0].user_email;

            // Fetch manager progress
            const selectQuery1 = `SELECT cube_id, is_finished FROM user_progress WHERE user_email = ? AND level_id = ? AND game_id = ?`;
            const selectParams1 = [game_manager, level_id, game_id];

            let game_progress = undefined;
            try {
                game_progress = await executeQuery(selectQuery1, selectParams1);
            } catch (error) {
                console.log("Error fetching game progress");
                console.error(error);
                throw error;
            }

            // Check if user already exists in user_to_game table
            const selectQuery2 = `SELECT * FROM user_to_game WHERE game_id = ? AND user_email = ?`;
            const selectParams2 = [game_id, gameDetails.user_email];

            let userExists = undefined;
            try {
                userExists = await executeQuery(selectQuery2, selectParams2);
            } catch (error) {
                console.log("Error checking user existence");
                console.error(error);
                throw error;
            }

            if (userExists.length === 0) {
                // Insert user to game
                const insertQuery = `INSERT INTO user_to_game (game_id, user_email) VALUES (?, ?)`;
                const insertParams = [game_id, gameDetails.user_email];

                try {
                    await executeQuery(insertQuery, insertParams);
                } catch (error) {
                    console.log("Error joining game");
                    console.error(error);
                    throw error;
                }
                console.log('Success joining game');
            } else {
                console.log('User already exists in the game');
            }

            return {
                cubes: game_progress,
                game_id: game_id,
                level_id: level_id,
                manager: game_manager,
                password: password
            }
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


const markSolved = async (cubeGameDetails) => {
    const user_email = cubeGameDetails.user_email.email;
    const level_id = cubeGameDetails.level_id;
    const cube_id = cubeGameDetails.cube_id;
    const game_id = cubeGameDetails.game_id;

    // Check if user already exists in user_progress table
    const selectQuery = `SELECT * FROM user_progress WHERE user_email = ? AND level_id = ? AND cube_id = ? AND game_id = ?`;
    const selectParams = [user_email, level_id, cube_id, game_id];

    try {
        const userExists = await executeQuery(selectQuery, selectParams);
        if (userExists.length === 0) {
            // Insert user into user_progress
            const insertQuery = `INSERT INTO user_progress (user_email, level_id, cube_id, is_finished, game_id) VALUES (?, ?, ?, ?, ?)`;
            const insertParams = [user_email, level_id, cube_id, 1, game_id];
            try {
                await executeQuery(insertQuery, insertParams);
                console.log(`Marked cube:`, cube_id, `successfully`);
            } catch (error) {
                console.error(error);
                console.log('Error finishing cube');
                throw error;
            }
        }
    } catch (error) {
        console.error(error);
        console.log('Error checking user existence');
        throw error;
    }
};

const postScore = async (competitionDetails) => {
    const {user, level, time} = competitionDetails;
    const score = calculateScore(time, level);

    try {
        // Get the user's current score from the user table
        const selectQuery = `SELECT user_score FROM user WHERE user_email = ?`;
        const selectParams = [user];
        const result = await executeQuery(selectQuery, selectParams);
        const currentUserScore = result[0].user_score;

        // Update the user's score in the user table
        const updatedScore = currentUserScore + score;
        const updateQuery = `UPDATE user SET user_score = ? WHERE user_email = ?`;
        const updateParams = [updatedScore, user];
        await executeQuery(updateQuery, updateParams);

        console.log(`Score updated for user: ${user}, New score: ${updatedScore}`);
        return {score: updatedScore};
    } catch (error) {
        console.error(error);
        console.log('Error updating user score');
        throw error;
    }
};


module.exports = {
    getUserAction,
    chooseLevel,
    fetchGameState,
    createGame,
    joinGame,
    markSolved,
    postScore,
};


