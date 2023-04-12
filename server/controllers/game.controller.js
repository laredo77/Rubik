const gameService = require("../services/game.service.js");

// game functions
const uploadImages = async (req, res) => {  //todo change to save
    console.log(req)
    try {
        const images = await gameService.uploadImages(req.body);    //todo check where images saved
        res.send(images);
    } catch (error) {
        console.log(error);
        res.status(401).send("images not uploaded");
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
};

