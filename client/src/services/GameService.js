//const axios = require("axios");

import axios from "axios";

export class GameService {
    /*
        GAME (FREE-PLAY, MOSAIC) SECTION
    */
    static async getGameState(gameDetails) {
        // const response = await axios.get("http://localhost:3001/user/gameState", {
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
        // const response = await axios.get(`${BASE_URL}/auth/${id}/twitter`);
        // if (response.status !== 200) return;
        // window.location.replace(response.data); // itamar: redirct to twitter auth
        // return await response.data;
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

    static async getMatchState(matchDetails) {
        // let choice = "a201"
        // var intr = setInterval(function() {
        //     let move = choice
        //     var elements = document.querySelectorAll(`#${move}`);
        //     elements.forEach(function(element) {
        //         const event = new MouseEvent('click', {
        //             view: window,
        //             bubbles: true,
        //             cancelable: true
        //         });
        //         element.dispatchEvent(event);
        //     });
        //     //if (movesArray.length == 0) clearInterval(intr)
        // }, 500)
    }

    static async quitMatch(matchDetails) {
        // in server should check if the quitter is player or manager
        // if manager, keep the match open
        // else delete match from db
        //console.log(matchDetails);
    }

}

export default GameService;
