const gameService = require("../services/game.service.js");

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

module.exports = {
    uploadImages,
};