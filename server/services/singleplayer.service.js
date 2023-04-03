const database = require("../database");
const {getLevelNumber, getLevelString} = require("../utility/levelUtils");

const chooseLevel = async (playerLevel) => {
    const levelNumber = getLevelNumber(playerLevel.level);
    const query = `SELECT Cube_representation FROM levelcube WHERE Level_ID='${levelNumber}'`
    database.connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while selecting level')
        } else {
            const levelString = getLevelString(results);
            console.log("Change to level:", levelString)
            return levelString;
        }
    });
};

module.exports = {
    chooseLevel,
};
