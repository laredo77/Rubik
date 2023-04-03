function getLevelNumber(playerLevel) {
    // Extract the numeric part of the level string using a regular expression
    const levelMatch = playerLevel.match(/(\d+)/);

    // If a match was found, return the numeric part as a number, otherwise return null
    return levelMatch ? parseInt(levelMatch[0]) : null;
}

function getLevelString(results) {
    if (results.length > 0) {
        return results[0].cube_string;
    } else {
        return null;
    }
}


module.exports = {
    getLevelNumber,
    getLevelString
};
