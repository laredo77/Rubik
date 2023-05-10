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

const createGame = async (req, res) => {
    try {
        console.log("in game controller:", req.body.gameLevel);
        const details = await gameService.createGame(req.body.gameLevel)
        console.log("game controller:", details)
        res.send(details);
    } catch (error) {
        console.log(error);
        res.status(401).send("Game not created");
    }
}

const joinGame = async (req, res) => {
    try {
        const details = JSON.parse(req.headers.details);
        const id = details.gameDetails.id;
        const password = details.gameDetails.password;
        const result = await gameService.joinGame({id: id, password: password})
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(401).send("Error joining to game");
    }
}


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
    createGame,
    joinGame,
};

