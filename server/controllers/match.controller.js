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


const getMatchStatus = async (req, res) => {
    try {
        const status = await matchService.getMatchStatus(req.query.manager);
        //console.log(status)
        res.send(status);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to set match");
    }
};

const applyMove = async (req, res) => {
    //console.log(req.body)
    // try {
    //     const matchDetails = await matchService.setMatch(req.body);
    //     res.send(matchDetails);
    // } catch (error) {
    //     console.log(error);
    //     res.status(401).send("Failed to set match");
    // }
};

const getMatchState = async (req, res) => {
    console.log("bbb")
    //res.send("a201")
    // try {
    //     const matchState = await matchService.matchState(req.query.manager);
    //     res.send(matchState);
    // } catch (error) {
    //     res.status(401).send("Failed");
    // }
};

module.exports = {
    setMatch,
    getMatchStatus,
    applyMove,
    getMatchState,
};