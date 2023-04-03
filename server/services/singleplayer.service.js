const database = require("../database");
const {getLevelNumber, getLevelString} = require("../utility/levelUtils");

const chooseLevel = async (playerLevel) => {
    const levelNumber = getLevelNumber(playerLevel.level);
    const query = `SELECT cube_string FROM level_cube WHERE level_id='${levelNumber}'`
    database.connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while selecting level')
        } else {
            const levelString = getLevelString(results);
            console.log("Change level, cube state:", levelString)
            return levelString;
        }
    });
};

module.exports = {
    chooseLevel,
};
