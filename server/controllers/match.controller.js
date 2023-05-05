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


// const getMatchStatus = async (req, res) => {
//     try {
//         const status23 = await matchService.getMatchStatus(req.query.manager);
//         console.log("status23: ", status23)
//         res.send(status23);
//     } catch (error) {
//         console.log(error);
//         console.log("error: ", error)
//         res.status(401).send("Failed to set match");
//     }
// };

const getMatchStatus = async (req, res) => {
    const manager = req.query.manager;

    const checkMatchStatus = async () => {
        try {
            const status = await matchService.getMatchStatus(manager);
            res.send(status);
        } catch (error) {
            console.log("error: ", error);
            setTimeout(checkMatchStatus, 7000);
        }
    };

    checkMatchStatus();
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