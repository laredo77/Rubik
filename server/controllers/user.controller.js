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
        //const leaderboard = [{Email: "first", User_Picture:"https://img.freepik.com/free-photo/headshot-beautiful-dark-skinned-curly-has-pleased-expression-rejoices-success-enjoys-spare-time-wears-casual-t-shirt-isolated-yellow-wall-people-positive-emotions-feelings-concept_273609-27729.jpg", Score: 112}, {Email: "second", User_Picture:"https://img.freepik.com/free-photo/headshot-beautiful-dark-skinned-curly-has-pleased-expression-rejoices-success-enjoys-spare-time-wears-casual-t-shirt-isolated-yellow-wall-people-positive-emotions-feelings-concept_273609-27729.jpg", Score: 9}]
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
