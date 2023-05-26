// File: matchController.js
// Description: This file contains the controller functions for managing match-related operations.
// It defines functions to handle setting up a match, joining a match, getting match status, applying moves,
// retrieving match state, quitting a match, and getting initial match moves.

const matchService = require("../services/match.service.js");

// Function: setMatch
// Description: Sets up a match with the provided match details.
const setMatch = async (req, res) => {
    try {
        const matchDetails = await matchService.setMatch(req.headers.matchdetails);
        res.send(matchDetails);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to set match");
    }
};

// Function: getInitMatchMoves
// Description: Retrieves the initial match moves for a given level.
const getInitMatchMoves = async (req, res) => {
    const level = req.query.level;

    try {
        const initMatchMoves = await matchService.getInitMatchState(level);
        const extractedValues = initMatchMoves.map((obj) => obj.initMoves);
        res.send(extractedValues);
    } catch (error) {
        console.log("error: ", error);
    }
};

// Function: joinMatch
// Description: Joins a match with the provided match details.
const joinMatch = async (req, res) => {
    try {
        const matchDetails = await matchService.joinMatch(req.body);
        res.send(matchDetails);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to set match");
    }
};

// Function: getMatchStatus
// Description: Retrieves the status of a match for a given manager.
const getMatchStatus = async (req, res) => {
    const manager = req.query.manager;

    // Recursive function to continuously check the match status until a response is received
    const checkMatchStatus = async () => {
        try {
            const status = await matchService.getMatchStatus(manager);
            res.send(status);
        } catch (error) {
            console.log("error: ", error);
            setTimeout(checkMatchStatus, 7000); // Retry after a delay if an error occurs
        }
    };

    await checkMatchStatus();
};

// Function: applyMove
// Description: Applies a move to the match.
const applyMove = async (req, res) => {
    try {
        const move = await matchService.applyMove(req.headers.move);
        res.send(move);
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
};

// Function: getMatchState
// Description: Retrieves the current state of the match.
const getMatchState = async (req, res) => {
    try {
        const moves = await matchService.matchState(req.query);
        res.send(moves);
    } catch (error) {
        res.status(401).send("Failed");
    }
};

// Function: quitMatch
// Description: Quits the match for the specified user.
const quitMatch = async (req, res) => {
    try {
        const response = await matchService.quit(req.headers.user);
        res.send(response);
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
};

module.exports = {
    setMatch,
    joinMatch,
    getMatchStatus,
    applyMove,
    getMatchState,
    quitMatch,
    getInitMatchMoves,
};
