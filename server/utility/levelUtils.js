function getLevelNumber(playerLevel) {
    // Extract the numeric part of the level string using a regular expression
    const levelMatch = playerLevel.match(/(\d+)/);

    // If a match was found, return the numeric part as a number, otherwise return null
    return levelMatch ? parseInt(levelMatch[0]) : null;
}

module.exports = {
    getLevelNumber
};
