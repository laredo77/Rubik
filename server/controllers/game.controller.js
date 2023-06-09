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
        const gameDetails = JSON.parse(req.headers.details);
        const gameState = await gameService.fetchGameState(gameDetails.gameDetails);
        res.send(gameState);
    } catch (error) {
        console.log(error);
        res.status(401).send("couldn't fetch game state from DB");
    }
};


// old singleplayer function
const chooseLevel = async (req, res) => {
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
        const details = await gameService.createGame(req.body.gameLevel)
        res.send(details);
    } catch (error) {
        console.log(error);
        res.status(401).send("Game not created");
    }
}

const joinGame = async (req, res) => {
    try {
        const details = JSON.parse(req.headers.details);
        const id = details.gameLevel.game_id;
        const password = details.gameLevel.password;
        const user_email = details.player.email;
        const result = await gameService.joinGame({game_id: id, password: password, user_email: user_email})
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(401).send("Error joining to game");
    }
}

const markSolved = async (req, res) => {
    try {
        const details = JSON.parse(req.headers.details);
        const user_email = details.cubeGameDetails.user_email;
        const level_id = details.cubeGameDetails.level_id;
        const cube_id = details.cubeGameDetails.cube_id;
        const game_id = details.cubeGameDetails.game_id;
        const result = await gameService.markSolved({
            user_email: user_email, level_id: level_id,
            cube_id: cube_id, game_id: game_id
        })
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(401).send("Error marking solved");
    }
}

// competition-mode controller functions
const postCompScore = async (req, res) => {
    try {
        const competitionDetails = req.body;
        const updatedScore = await gameService.postScore(competitionDetails);
        res.send(updatedScore);
    } catch (error) {
        console.log(error);
        res.status(401).send("Error updating score");
    }
};

module.exports = {
    uploadImages,
    postCompScore,
    chooseLevel,
    getGameState,
    createGame,
    joinGame,
    markSolved,
};

