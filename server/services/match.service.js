const {generateStr, findStringInCSV, getRowFromCsvFile} = require("../utility/generalUtils");
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
    console.log(matchID, matchPWD)
    lock.acquire('myLock', async function () {
        const data = [
            {matchDetails: matchID, p1moves: "", p2moves: ""},
            {matchDetails: matchPWD, p1moves: "", p2moves: ""},
            {matchDetails: matchDetails.manager, p1moves: "", p2moves: ""}
        ];

        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                {id: 'matchDetails', title: 'MatchDetails'},
                {id: 'p1moves', title: 'P1_Moves'},
                {id: 'p2moves', title: 'P2_Moves'}
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
    // TODO: check if matchId and password correct and if not pop it to the player

    // lock for reading
    // const AsyncLock = require('async-lock');
    // const lock = new AsyncLock();
    // lock.acquire('myLock', async function() {
    // });
    // const matchId = getRowFromCsvFile(filePath, 1)
    // const matchPwd = getRowFromCsvFile(filePath, 2)

    if (matchID != matchDetails.gameId || matchPWD != matchDetails.password) {
        return "failed"
    }

    lock.acquire('myLock', async function () {
        const csvWriter = createCsvWriter({
            path: filePath,
            header: [
                {id: 'matchDetails', title: 'MatchDetails'},
                {id: 'p1moves', title: 'P1_Moves'},
                {id: 'p2moves', title: 'P2_Moves'}
            ],
            append: true
        });

        const newData = [
            {matchDetails: matchDetails.user, p1moves: "", p2moves: ""}
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
    return new Promise((resolve, reject) => {
        lock.acquire('myLock', () => {
            const lineNumber = 4; // read the 4th line of the CSV file (second player)
            const lines = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    lines.push(data);
                })
                .on('end', () => {
                    console.log(`Line ${lineNumber}:`, lines[lineNumber - 1]);
                    if (lines[lineNumber - 1]) {
                        console.log("there is second player");
                        resolve({ status: 200 }); // found the second player, resolve with the status object
                    } else {
                        console.log("there is not second player");
                        // second player not found, reject the promise
                        reject(new Error("Second player not found"));
                    }
                });
        });
    });
};


const matchState = async (user) => {
    const line = await findStringInCSV(filePath, user.manager);
    let opponentPlayer = "";
    let currentPlayer = "";
    switch (line) {
        case 2:
            opponentPlayer = "P2_Moves";
            currentPlayer = "P1_Moves";
            break;
        case 3:
            opponentPlayer = "P1_Moves";
            currentPlayer = "P2_Moves";
            break;
        default:
            return;
    }

    return new Promise((resolve, reject) => {
        lock.acquire('myLock', async function () {
            const rows = [];
            const opponentMoves = []
            // Read the CSV file and store the data from the opponent player column in the rows array
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    if (row[opponentPlayer] !== undefined) {
                        // Keep the first row of data in the opponent player column
                        if (rows.length === 0) {
                            rows.push(row);
                        } else {
                            // Replace all other rows of data in the opponent player column with an empty value
                            opponentMoves.push(row[opponentPlayer])
                            row[opponentPlayer] = '';
                            rows.push(row);
                        }
                    }
                })
                .on('end', () => {
                    // Extract the data from the opponent player column into an array
                    const opponentPlayerData = rows.slice(1).map(row => row[opponentPlayer]);

                    // Write the updated CSV file back to disk, with the opponent player column cleared
                    const csvWriter = createCsvWriter({
                        path: filePath,
                        header: [
                            {id: 'MatchDetails', title: 'MatchDetails'},
                            {id: 'P1_Moves', title: 'P1_Moves'},
                            {id: 'P2_Moves', title: 'P2_Moves'}
                        ]
                    });

                    csvWriter.writeRecords(rows)
                        .then(() => {
                            console.log('CSV file has been updated');
                            //console.log(opponentMoves)
                            resolve(opponentMoves)
                            // if (user.manager === currentPlayer) {
                            //     // Resolve the promise with the opponent player data if the current user is the other player
                            //     console.log(opponentPlayerData)
                            //     resolve(opponentPlayerData);
                            // }
                        })
                        .catch((error) => {
                            console.error(error);
                            reject(error);
                        });
                });
        });
    });
};


const applyMove = async (move) => {
    const {user, piece, direction} = JSON.parse(move);
    const line = await findStringInCSV(filePath, user);
    let player = "";
    switch (line) {
        case 2:
            player = "P1_Moves";
            break;
        case 3:
            player = "P2_Moves";
            break;
        default:
            return;
    }

    return new Promise((resolve, reject) => {
        lock.acquire('myLock', async function () {
            const rows = [];

            // Read the CSV file and store the data in the rows array
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', () => {
                    let blankRowIndex = -1;

                    // Find the first blank row in the player column
                    for (let i = 0; i < rows.length; i++) {
                        if (rows[i][player] === '') {
                            blankRowIndex = i;
                            break;
                        }
                    }

                    if (blankRowIndex === -1) {
                        // If no blank row was found, add a new row to the end of the CSV file
                        if (player == "P1_Moves") {
                            rows.push({
                                P1_Moves: (piece.toString() + direction.toString()),
                            });
                        } else if (player == "P2_Moves") {
                            rows.push({
                                P2_Moves: (piece.toString() + direction.toString())
                            });
                        }
                    } else {
                        // If a blank row was found, update the player's column in that row
                        rows[blankRowIndex][player] = (piece.toString() + direction.toString());
                    }

                    // Write the updated CSV file back to disk
                    const csvWriter = createCsvWriter({
                        path: filePath,
                        header: [
                            {id: 'MatchDetails', title: 'MatchDetails'},
                            {id: 'P1_Moves', title: 'P1_Moves'},
                            {id: 'P2_Moves', title: 'P2_Moves'}
                        ]
                    });

                    csvWriter.writeRecords(rows)
                        .then(() => {
                            console.log('CSV file has been updated');
                            resolve();
                        })
                        .catch((error) => {
                            console.error(error);
                            reject(error);
                        });
                });
        });
    });
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
