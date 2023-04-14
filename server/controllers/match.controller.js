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
    try {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 3) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        res.send(result)
    } catch (error) {
        res.status(401).send("Failed");
    }
};


module.exports = {
    setMatch,
    getMatchStatus,
    applyMove,
    getMatchState,
};