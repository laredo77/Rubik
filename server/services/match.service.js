const {generateStr} = require("../utility/generalUtils");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const fs = require('fs');
const csv = require('csv-parser');

const filePath = './matchData/data.csv';
let matchID = ""
let matchPWD = ""

const setMatch = async (matchDetails) => {
    matchID = generateStr(3)
    matchPWD = generateStr(3)

    lock.acquire('myLock', async function() {
        const data = [
            { matchDetails: matchID, p1moves: "", p2moves: "" },
            { matchDetails: matchPWD, p1moves: "", p2moves: "" },
            { matchDetails: matchDetails.manager, p1moves: "", p2moves: "" }
        ];

        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                { id: 'matchDetails', title: 'MatchDetails' },
                { id: 'p1moves', title: 'P1_Moves' },
                { id: 'p2moves', title: 'P2_Moves' }
            ]
        });

        csvWriter.writeRecords(data)
            .then(() => {
                console.log('CSV file created successfully');
                return {matchId: matchID, password: matchPWD};
            })
            .catch((error) => {
                console.error(error);
            });
    });
};

const joinMatch = async (matchDetails) => {
    //console.log(matchDetails) // { gameId: 'abc', password: 'aaa', user: 'MyUser@gmail.com' }
    // check if matchId and password correct and if not pop it to the player

    // lock for reading
    // const AsyncLock = require('async-lock');
    // const lock = new AsyncLock();
    // lock.acquire('myLock', async function() {
    // });

    lock.acquire('myLock', async function() {
        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                { id: 'matchDetails', title: 'MatchDetails' },
                { id: 'p1moves', title: 'P1_Moves' },
                { id: 'p2moves', title: 'P2_Moves' }
            ],
            append: true
        });

        const newData = [
            { matchDetails: matchDetails.user, p1moves: "", p2moves: "" }
        ];

        csvWriter.writeRecords(newData)
            .then(() => {
                console.log('New data added to the CSV file successfully');
                return {gameId: matchID, password: matchPWD};
            })
            .catch((error) => {
                console.error(error);
            });
    });
};

const getMatchStatus = async (manager) => {

    lock.acquire('myLock', async function() {
        const lineNumber = 4; // read the 4th line of the CSV file (second player)

        const lines = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                lines.push(data);
            })
            .on('end', () => {
                console.log(`Line ${lineNumber}:`, lines[lineNumber - 1]);
                // if second player return {status: 200}
                // and if ok also shuffle the cube for both of the players
            });
    });

    // should be removed
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({status: 200});
        }, 5000);
    });
};

// const matchState = async (manager) => {
//     // the function should return from DB the moves the opponent did.
//     // for now its just shuffle steps and send
//     let amountOfSteps = 2;
//     let movesArray = []
//     let choices = new Array(8).fill(0);
//     choices.push(1)
//     choices.push(1)
//     for (let i = 0; i < amountOfSteps; i++) {
//         const randomElement = choices[Math.floor(Math.random() * choices.length)];
//         let random_arrow, random_direction, choice;
//         if (randomElement === 0) {
//             random_arrow = Math.floor(Math.random() * 8);
//             random_direction = Math.floor(Math.random() * 2);
//             choice = "a" + random_arrow.toString() + random_direction.toString() + "1"
//         } else {
//             let rotateArrows = ["x", "y", "z"]
//             random_arrow = Math.floor(Math.random() * 3);
//             random_direction = Math.floor(Math.random() * 2);
//             choice = rotateArrows[random_arrow] + random_direction.toString() + "1"
//         }
//         movesArray.push(choice)
//     }
//     return movesArray
// };

const matchState = async (manager) => {
    return new Promise((resolve, reject) => {
        lock.acquire('myLock', async function() {
            const rows = [];

            // Read the CSV file and store the data from the second column in the rows array
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    if (row['P2_Moves'] !== undefined) {
                        // Keep the first row of data in the second column
                        if (rows.length === 0) {
                            rows.push(row);
                        } else {
                            // Replace all other rows of data in the second column with an empty value
                            row['P2_Moves'] = '';
                            rows.push(row);
                        }
                    }
                })
                .on('end', () => {
                    // Extract the data from the second column into an array
                    const column2Data = rows.slice(1).map(row => row['P2_Moves']);

                    // Resolve the promise with the column2Data array
                    resolve(column2Data);

                    // Write the updated CSV file back to disk
                    const csvWriter = createCsvWriter({
                        path: filePath,
                        header: [
                            { id: 'MatchDetails', title: 'MatchDetails' },
                            { id: 'P1_Moves', title: 'P1_Moves' },
                            { id: 'P2_Moves', title: 'P2_Moves' }
                        ]
                    });

                    csvWriter.writeRecords(rows)
                        .then(() => {
                            console.log('CSV file has been updated');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
        });
    });
};


const applyMove = async (move) => {
    // add to DB the move
    // return OK
    return "200OK"
};

const quit = async (user) => {
    // check in DB if the user is the manager if yes, close the game.
    // otherwise send the keep the manager waiting to new player and
    // the one who quit go back to home page..
    return "200OK"
};

module.exports = {
    setMatch,
    joinMatch,
    getMatchStatus,
    matchState,
    applyMove,
    quit,
};
