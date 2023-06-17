const gameService = require("../services/game.service.js");

/**
 * Uploads images for the game.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const uploadImages = async (req, res) => {
    try {
        const action = await gameService.getUserAction(req.body);
        res.send(action);
    } catch (error) {
        console.log(error);
        res.status(401).send("Images could not be uploaded");
    }
};

/**
 * Retrieves the game state.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const getGameState = async (req, res) => {
    try {
        const gameDetails = JSON.parse(req.headers.details);
        const gameState = await gameService.fetchGameState(gameDetails.gameDetails);
        res.send(gameState);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to fetch game state from the database");
    }
};

/**
 * Creates a new game.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const createGame = async (req, res) => {
    try {
        const details = await gameService.createGame(req.body.gameLevel);
        res.send(details);
    } catch (error) {
        console.log(error);
        res.status(401).send("Game creation failed");
    }
};

/**
 * Joins an existing game.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const joinGame = async (req, res) => {
    try {
        const details = JSON.parse(req.headers.details);
        const {game_id, password} = details.gameLevel;
        const {email: user_email} = details.player;
        const result = await gameService.joinGame({game_id, password, user_email});
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to join the game");
    }
};

/**
 * Marks a cube as solved in the game.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const markSolved = async (req, res) => {
    try {
        const details = JSON.parse(req.headers.details);
        const {user_email, level_id, cube_id, game_id} = details.cubeGameDetails;
        const result = await gameService.markSolved({
            user_email,
            level_id,
            cube_id,
            game_id
        });
        res.send(result);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to mark as solved");
    }
};

/**
 * Updates the competition score.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>}
 */
const postCompScore = async (req, res) => {
    try {
        const competitionDetails = req.body;
        const updatedScore = await gameService.postScore(competitionDetails);
        res.send(updatedScore);
    } catch (error) {
        console.log(error);
        res.status(401).send("Failed to update the score");
    }
};

module.exports = {
    uploadImages,
    postCompScore,
    getGameState,
    createGame,
    joinGame,
    markSolved,
};
