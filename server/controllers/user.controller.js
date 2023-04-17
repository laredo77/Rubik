const userService = require("../services/user.service.js");

const addUser = async (req, res) => {
    try {
        const user = await userService.addUser(req.body);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(401).send("User did not added");
    }
};

const getLeaderBoard = async (req, res) => {
    try {
        const leaderboard = await userService.buildLeaderboard();
        res.send(leaderboard);
    } catch (error) {
        console.log(error);
        res.status(401).send("couldn't fetch leaderboard");
    }
};


module.exports = {
    addUser,
    getLeaderBoard,
};
