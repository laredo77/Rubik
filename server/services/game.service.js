const database = require("../database");
const {getLevelNumber, getLevelString} = require("../utility/levelUtils");
const {response} = require("express");
const {executePython} = require("../utility/pythonExecuter");


const getUserAction = async (action) => {
    const scriptFileName = "identify_and_solve.py"
    const result = await executePython(scriptFileName, [action.action]);
    console.log("this is result:", await result)
    return {action: action};
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


module.exports = {
    getUserAction,
    chooseLevel,
    fetchGameState,
};


