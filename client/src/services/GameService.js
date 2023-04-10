//const axios = require("axios");

import axios from "axios";

export class GameService {
    static async getGameState(gameDetails) {
        const response = await axios.get("http://localhost:3001/user/gameState", {
            params: {
                manager: gameDetails.manager,
                level: gameDetails.level,
            },
        });
        if (response.status !== 200) return;
        //console.log(await response.data); //{gameState: 'gameState'}
        return await response.data;
        // 1. call server with user details
        // 2. init in db new line with user details + desire level
        // 3. send back to user special code + password to join the game
    }

    static async joinGame(gameDetails, player) {
        console.log(gameDetails);
        console.log(player);
        // const response = await axios.get(`${BASE_URL}/auth/${id}/twitter`);
        // if (response.status !== 200) return;
        // window.location.replace(response.data); // itamar: redirct to twitter auth
        // return await response.data;
        // 1. call server with gameDetails, user nickname(player)
        // 2. add to db the player
    }

    static async setCompGameLevel(gameDetails) {
        const response = await axios.post("http://localhost:3001/singleplayer/choose-level", gameDetails);
        if (response.status !== 200)
            return;

    }

    static async uploadImages(images) {
        console.log(images)
        const response = await axios.post("http://localhost:3001/game/upload-images", images);
        if (response.status !== 200)
            return;
    }

    static async setMatch(matchDetails) {
        const response = await axios.post("http://localhost:3001/match/setMatch", matchDetails);
        if (response.status !== 200)
            return;
        return response.data
    }

    static async matchStatus(matchDetails) {
        const response = await axios.get("http://localhost:3001/match/matchStatus", {
            params: {
                manager: matchDetails.email,
            },
        });
        if (response.status !== 200) return;
        return await response.data.status;
    }

    static async applyMoveInMatch(moveDetails) {
        //console.log(moveDetails)
        await axios.post("http://localhost:3001/match/applyMove", moveDetails);
        // if (response.status !== 200)
        //     return;
        // return response.data
        // send to server the user and the move
        // server send to the second player the move had perform
    }

    static async quitMatch(matchDetails) {
        // in server should check if the quitter is player or manager
        // if manager, keep the match open
        // else delete match from db
        //console.log(matchDetails);
    }
}

export default GameService;
