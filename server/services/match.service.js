// File: match.controller.js
// Description: This file contains the controller functions for managing matches.

const {generateStr, findStringInCSV, getShuffleCubeMoves} = require("../utility/generalUtils");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const AsyncLock = require('async-lock');
const lock = new AsyncLock();
const fs = require('fs');
const csv = require('csv-parser');

const filePath = './matchData/data.csv';
const initMovesFilePath = './matchData/initMoves.csv';
let matchID = "";
let matchPWD = "";
let quitStatus;

// Function: setMatch
// Description: Sets up a new match with the provided match details.
const setMatch = (matchDetails) => {
    return new Promise((resolve, reject) => {
        let md = JSON.parse(matchDetails);
        matchID = generateStr(3);
        matchPWD = generateStr(3);
        lock.acquire('myLock', async function () {

            const data = [
                {matchDetails: matchID, p1moves: "", p2moves: ""},
                {matchDetails: matchPWD, p1moves: "", p2moves: ""},
                {matchDetails: md.manager, p1moves: "", p2moves: ""}
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
                .then(async () => {
                    console.log('CSV file created successfully');
                    await setInitMatchState(md.level);
                    resolve({matchId: matchID, password: matchPWD});
                })
                .catch((error) => {
                    console.error(error);
                    reject(error);
                });
        });
    });
};

// Function: setInitMatchState
// Description: Sets the initial match state by generating shuffle cube moves.
const setInitMatchState = async (level) => {
    lock.acquire('myLock', async function () {
        const csvWriter = createCsvWriter({
            path: initMovesFilePath,
            header: [
                {id: 'moves', title: 'initMoves'}
            ]
        });

        const newData = [];
        const initMatchState = getShuffleCubeMoves(level);
        for (let i = 0; i < initMatchState.length; i++) {
            newData.push({moves: initMatchState[i]});
        }

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

// Function: getInitMatchState
// Description: Retrieves the initial match state from the CSV file.
const getInitMatchState = () => {
    return new Promise((resolve, reject) => {
        lock.acquire('myLock', () => {
            const lines = [];
            fs.createReadStream(initMovesFilePath)
                .pipe(csv())
                .on('data', (data) => {
                    lines.push(data);
                })
                .on('end', () => {
                    resolve(lines);
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
    });
};

// Function: joinMatch
// Description: Allows a user to join an existing match using the provided match details.
const joinMatch = async (matchDetails) => {
    if (matchID != matchDetails.gameId || matchPWD != matchDetails.password) {
        return "failed";
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

// Function: getMatchStatus
// Description: Retrieves the status of the match, indicating if the second player has joined.
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
                        resolve({status: 200}); // found the second player, resolve with the status object
                    } else {
                        console.log("there is not second player");
                        // second player not found, reject the promise
                        reject(new Error("Second player not found"));
                    }
                });
        });
    });
};

// Function: matchState
// Description: Retrieves the match state and clears the opponent player's moves.
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

    quitStatus = await findStringInCSV(filePath, "quit");

    return new Promise((resolve, reject) => {
        lock.acquire('myLock', async function () {
            const rows = [];
            const opponentMoves = [];
            const allData = [];
            // Read the CSV file and store the data from the opponent player column in the rows array
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    if (row[opponentPlayer] !== undefined) {
                        allData.push(row);
                        // Keep the first row of data in the opponent player column
                        if (rows.length === -1) {
                            rows.push(row);
                        } else {
                            // Replace all other rows of data in the opponent player column with an empty value
                            opponentMoves.push(row[opponentPlayer]);
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
                            resolve({moves: opponentMoves, quitStatus: quitStatus});
                        })
                        .catch((error) => {
                            console.error(error);
                            reject(error);
                        });
                });
        });
    });
};

// Function: applyMove
// Description: Applies the player's move to the CSV file.
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
                                P1_Moves: (piece.toString() + direction.toString())
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

// Function: quit
// Description: Handles the quitting of a player from the match.
const quit = async (user) => {
    // Check in DB if the user is the manager. If yes, close the game.
    let userWithoutQoutes = user.substring(1, user.length-1);
    const line = await findStringInCSV(filePath, userWithoutQoutes);
    if (line === 3 || line === 2) {
        lock.acquire('myLock', async function () {
            const rows = [];
            // Read the CSV file and store the data in the rows array
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (row) => {
                    rows.push(row);
                })
                .on('end', () => {
                    rows[0] = {MatchDetails: "quit", P1_Moves: "", P2_Moves: ""};
                    rows[1] = {MatchDetails: "quit", P1_Moves: "", P2_Moves: ""};

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
                            quitStatus = true;
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
        });
    }
    return {quitStatus: quitStatus};
};

module.exports = {
    setMatch,
    setInitMatchState,
    getInitMatchState,
    joinMatch,
    getMatchStatus,
    matchState,
    applyMove,
    quit
};
