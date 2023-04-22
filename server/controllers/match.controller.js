const matchService = require("../services/match.service.js");

const setMatch = async (req, res) => {
    try {
        const matchDetails = await matchService.setMatch(req.body);
        res.send(matchDetails);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to set match");
    }
};

const joinMatch = async (req, res) => {
    try {
        const matchDetails = await matchService.joinMatch(req.body);
        res.send(matchDetails);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to set match");
    }
};


const getMatchStatus = async (req, res) => {
    try {
        const status = await matchService.getMatchStatus(req.query.manager);
        console.log(status)
        res.send(status);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to set match");
    }
};

const applyMove = async (req, res) => {
    try {
        const move = await matchService.applyMove(req.headers.move);
        res.send(move);
    } catch (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
};

const getMatchState = async (req, res) => {
        try {
            const moves = await matchService.matchState(req.query);
            res.send(moves);
        } catch
            (error) {
            res.status(401).send("Failed");
        }
    }


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
};