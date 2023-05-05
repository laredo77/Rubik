//const axios = require("axios");

import axios from "axios";

export class GameService {
    /*
        GAME (FREE-PLAY, MOSAIC) SECTION
    */
    static async getGameState(gameDetails) {
        // const response = await axios.get("http://localhost:3001/game/gameState", {
        //     params: {
        //         manager: gameDetails.manager,
        //         level: gameDetails.level,
        //     },
        // });
        // if (response.status !== 200) return;
        // return await response.data;

        let should_return = {
            gameId: "gameId123",
            password: "psw",
            gameState: "GS",
        }
        return should_return
    }

    static async joinGame(gameDetails, player) {
        //console.log(gameDetails);
        //console.log(player);
        // 1. call server with gameDetails, user nickname(player)
        // 2. add to db the player
    }

    static async uploadImages(images) {
        //console.log(images)
        const response = await axios.post("http://localhost:3001/game/upload-images", images);
        if (response.status !== 200)
            return;
    }

    /*
    COMPETITION MODE SECTION
    */
    static async setCompGameLevel(gameDetails) {
        const response = await axios.post("http://localhost:3001/game/choose-level", gameDetails);
        if (response.status !== 200)
            return;

    }

    static async postCompScore(scoreDetails) {
        //console.log(scoreDetails)
        await axios.post("http://localhost:3001/game/compScore", scoreDetails);
    }

    /*
    MATCH SECTION
    */
    static async setMatch(matchDetails) {
        const response = await axios.post("http://localhost:3001/match/setMatch", matchDetails);
        if (response.status !== 200)
            return;
        return response.data
    }

    static async joinMatch(matchDetails) {
        const response = await axios.post("http://localhost:3001/match/joinMatch", matchDetails);
        if (response.status !== 200)
            return;
        return response.status
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
        // send to server the user and the move
        // server send to the second player the move had perform
        const response = await axios.post("http://localhost:3001/match/applyMove", {},
            {
                headers: {
                    move: JSON.stringify(moveDetails),
                },
            });
        if (response.status !== 200) return;
    }


    static async getMatchState(manager) {
        const response = await axios.get("http://localhost:3001/match/getMatchState", {
            params: {
                manager: manager,
            },
        });
        if (response.status !== 200) return;
        return response.data;
    }


    static async quitMatch(user) {
        // in server should check if the quitter is player or manager
        // if manager, keep the match open
        // else delete match from db
        const response = await axios.post("http://localhost:3001/match/quit", {},
            {
                headers: {
                    user: JSON.stringify(user.email),
                },
            });
        if (response.status !== 200) return;
    }
}

export default GameService;
