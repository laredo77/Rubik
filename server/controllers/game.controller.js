const gameService = require("../services/game.service.js");

// game functions
const uploadImages = async (req, res) => {
    try {
        const action = await gameService.getUserAction(req.body);
        res.send(action);
    } catch (error) {
        console.log(error);
        res.status(401).send("images not uploaded");
    }
};

const getGameState = async (req, res) => {
    try {
        const gameState = await gameService.fetchGameState(req.query);
        res.send(gameState);
    } catch (error) {
        console.log(error);
        res.status(401).send("couldn't fetch game state from DB");
    }
};


// old singleplayer function
const chooseLevel = async (req, res) => {
    // console.log(req)
    try {
        const playerLevel = await gameService.chooseLevel(req.body);
        res.send(playerLevel);
    } catch (error) {
        console.log(error);
        res.status(401).send("level not chosen");
    }
};


// competition-mode controller functions
const postCompScore = async (req, res) => {
    console.log(req.body) // { user: 'MyMail@gmail.com', level: 1, time: 4.76 }
    // todo add to DB the score and rerender the leaderboard
    // if the score is in the top10 or something
};


module.exports = {
    uploadImages,
    postCompScore,
    chooseLevel,
    getGameState,
};

