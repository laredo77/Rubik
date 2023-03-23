const gameService = require("../services/singleplayer.service.js");

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

module.exports = {
    chooseLevel,
};