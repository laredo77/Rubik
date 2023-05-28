// File: userController.js
// Description: This file contains the controller functions for managing user-related operations.
// It defines functions to handle adding a user and retrieving the leaderboard.

const userService = require("../services/user.service.js");

// Function: addUser
// Description: Adds a user with the provided user details.
const addUser = async (req, res) => {
    try {
        const user = await userService.addUser(req.body);
        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(401).send("User did not added");
    }
};

// Function: getLeaderBoard
// Description: Retrieves the leaderboard of users.
const getLeaderBoard = async (req, res) => {
    try {
        const leaderboard = await userService.buildLeaderboard();
        // Sample leaderboard data
        // const leaderboard = [
        //   { Email: "first", User_Picture: "https://example.com/user1.jpg", Score: 112 },
        //   { Email: "second", User_Picture: "https://example.com/user2.jpg", Score: 9 }
        // ];
        res.send(leaderboard);
    } catch (error) {
        console.log(error);
        res.status(401).send("Couldn't fetch leaderboard");
    }
};

module.exports = {
    addUser,
    getLeaderBoard,
};
