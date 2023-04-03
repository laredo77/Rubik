const database = require("../database");
const {getLevelNumber} = require("../utility/levelUtils");

const chooseLevel = async (playerLevel) => {
    const levelNumber = getLevelNumber(playerLevel.level);
    const query = `SELECT Level_ID FROM levels WHERE Level_ID='${levelNumber}'`
    database.connection.query(query, (error, results) => {
        if (error) {
            console.error(error);
            console.log('An error occurred while selecting level')
        } else {
            console.log("Change to level:")
            console.log(results)
        }
    });
};

module.exports = {
    chooseLevel,
};
