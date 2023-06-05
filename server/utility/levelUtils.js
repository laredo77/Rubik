function getLevelNumber(playerLevel) {
    // Extract the numeric part of the level string using a regular expression
    const levelMatch = playerLevel.match(/(\d+)/);

    // If a match was found, return the numeric part as a number, otherwise return null
    return levelMatch ? parseInt(levelMatch[0]) : null;
}

/**
 * Returns a list of cube strings and their corresponding is_finished value,
 * or just a list of cube strings if is_competition is true.
 * @param {Array} results - The results object containing cube data.
 * @param {boolean} is_competition - Flag to indicate whether to return a list of pairs or just a list of cube strings.
 * @returns {Array|null} - A list of cube strings and their corresponding is_finished value (if is_competition is false), or just a list of cube strings (if is_competition is true), or null if results is empty.
 */
function getLevelString(results, is_competition) {
    if (results.length > 0) {
        const cubeStrings = [];
        // Loop through each row in results
        for (const row of results) {
            if (is_competition) {
                // If is_competition is true, just add the cube string to the list
                cubeStrings.push(row.cube_string);
            } else {
                // Otherwise, add a pair of the cube string and its is_finished value to the list
                cubeStrings.push([row.cube_string, row.is_finished]);
            }
        }
        // Return the list of cube strings or pairs
        return cubeStrings;
    } else {
        // If results is empty, return null
        return null;
    }
}

function calculateScore(time, level) {
    // Define the weights for time and level
    const timeWeight = 0.6; // Adjust this value to set the importance of time in the score
    const levelWeight = 0.4; // Adjust this value to set the importance of level in the score

    // Calculate the score based on time and level
    const timeScore = 1 / time; // Inverse of time, so smaller time gives a higher score

    // Combine the scores using the defined weights
    return Math.round((timeScore * timeWeight + level * levelWeight) * 100);
}

module.exports = {
    getLevelNumber,
    getLevelString,
    calculateScore,
};
