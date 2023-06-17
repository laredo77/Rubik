const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const fs = require('fs');
const csv = require('csv-parser');

// Function: generateStr
// Description: Generates a random string of the specified length.
const generateStr = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

// Function: findStringInCSV
// Description: Searches for a string in a CSV file and returns the row index where it is found.
const findStringInCSV = async (fileName, str) => {
    return new Promise((resolve, reject) => {
        lock.acquire('myLock', async function () {
            const rows = [];

            // Read the CSV file and store the data in the rows array
            fs.createReadStream(fileName)
                .pipe(csv())
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', () => {
                    // Find the row that contains the given string in the first column
                    let rowIndex = -1;
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i]['MatchDetails'] === str) {
                            rowIndex = i;
                            break;
                        }
                    }
                    resolve(rowIndex);
                });
        });
    });
};

// Function: getRowFromCsvFile
// Description: Retrieves a specific row from a CSV file based on the row index.
const getRowFromCsvFile = (filePath, r) => {
    return new Promise((resolve, reject) => {
        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                rows.push(row);
            })
            .on('end', () => {
                if (rows.length < 4) {
                    reject("File doesn't have enough rows");
                } else {
                    resolve(rows[r]['MatchDetails']);
                }
            });
    });
};

// Function: getShuffleCubeMoves
// Description: Generates an array of shuffle cube moves based on the specified level.
const getShuffleCubeMoves = (level) => {
    let amountOfSteps = 8 * level; // should be dependent on level
    let movesArray = [];
    let choices = new Array(8).fill(0);
    choices.push(1);
    choices.push(1);
    for (let i = 0; i < amountOfSteps; i++) {
        const randomElement = choices[Math.floor(Math.random() * choices.length)];
        let random_arrow, random_direction, choice;
        if (randomElement === 0) {
            random_arrow = Math.floor(Math.random() * 9) + 1;
            random_direction = Math.floor(Math.random() * 2);
            choice = "a" + random_arrow.toString() + random_direction.toString();
        } else {
            let rotateArrows = ["ax", "ay", "az"];
            random_arrow = Math.floor(Math.random() * 3);
            random_direction = Math.floor(Math.random() * 2);
            choice = rotateArrows[random_arrow] + random_direction.toString();
        }
        movesArray.push(choice);
    }
    return movesArray;
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
    generateStr,
    findStringInCSV,
    getRowFromCsvFile,
    getShuffleCubeMoves,
    calculateScore,
};
