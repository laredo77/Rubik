const chooseLevel = async (playerLevel) => {
    console.log(playerLevel);
    return {player: playerLevel.email, level: playerLevel.level};

    // Send a query to retrieve the required data
    const query = "SELECT LevelID FROM levels WHERE playerLevel.level = LevelID";


};

module.exports = {
    chooseLevel,
};
