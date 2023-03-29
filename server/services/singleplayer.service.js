const chooseLevel = async (playerLevel) => {
    console.log(playerLevel);
    return { player: playerLevel.email, level: playerLevel.level };
};

module.exports = {
    chooseLevel,
};
