const database = require("../database");
const {getLevelNumber, getLevelString} = require("../utility/levelUtils");


const uploadImages = async (images) => {        //todo check if post or get
    console.log(images);
    return { images:images};
};


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
    uploadImages,
    chooseLevel,
};


