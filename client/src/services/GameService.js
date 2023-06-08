//const axios = require("axios");

import axios from "axios";

export class GameService {
    /*
        GAME (FREE-PLAY, MOSAIC) SECTION
    */
    static async getGameState(gameDetails) {
        const details = {gameDetails: gameDetails};
        const response = await axios.post("http://localhost:3001/game/gameState", {},
            {
                headers: {
                    details: JSON.stringify(details),
                },
            });
        return response.data;
    }

    static async joinGame(gameDetails, player) {
        const details = {gameLevel: gameDetails, player: player};
        const response = await axios.post("http://localhost:3001/game/join-game", {},
            {
                headers: {
                    details: JSON.stringify(details),
                },
            });
        return response.data;
    }

    static async markSolved(cubeGameDetails) {
        const details = {cubeGameDetails: cubeGameDetails};
        const response = await axios.post("http://localhost:3001/game/mark-solved", {},
            {
                headers: {
                    details: JSON.stringify(details),
                },
            });
        return response.data;
    }

    static async uploadImages(action) {
        const response = await axios.post("http://localhost:3001/game/upload-images", {action},
            {
                headers: {
                    message: action,
                },
            });
        return response.data;
    }

    static async newGame(gameLevel) {
        const response = await axios.post("http://localhost:3001/game/create-game", {gameLevel},
            {
                headers: {
                    details: gameLevel,
                },
            });
        return response.data;
    }

    static async getFullStringFromGPT(cubeWig) {
        const apiUrl = 'https://api.openai.com/v1/chat/completions';
        const apiKey = ''
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };

        const message = `According to the Rubik's Cube rules, it is defined by a string of
         54 letters representing the stickers on the cube. The available colors are R (red),
          G (green), B (blue), O (orange), W (white), and Y (yellow). I have a single side
           of the cube with the string '${cubeWig}'. Could you provide a valid string definition
            for the entire Rubik's Cube starting with my side, while leaving the rest open?
            your answer should be just the string you configure. not any word more then just the string in response.
             Your assistance in generating a valid configuration would be greatly appreciated`
        const payload = {
            'model': 'gpt-3.5-turbo',
            'messages': [{'role': 'system', 'content': message}]
        };

        try {
            const response = await axios.post(apiUrl, payload, { headers });
            const reply = response.data.choices[0].message.content;
            console.log('ChatGPT reply:', reply);
            return reply;
        } catch (error) {
            console.error('Error:', error.response.data);
            return null;
        }
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
        await axios.post("http://localhost:3001/game/compScore", scoreDetails);
    }

    /*
    MATCH SECTION
    */
    static async setMatch(matchDetails) {
        const response = await axios.post("http://localhost:3001/match/setMatch", {},
            {
                headers: {
                    matchDetails: JSON.stringify(matchDetails),
                },
            });
        if (response.status !== 200) return;
        return response.data
    }

    static async joinMatch(matchDetails) {
        const response = await axios.post("http://localhost:3001/match/joinMatch", matchDetails);
        if (response.status !== 200)
            return;
        return response.status
    }

    static async getInitMatchMoves(level) {
        const response = await axios.get("http://localhost:3001/match/getInitMatchMoves", {
            params: {
                level: level,
            },
        });
        if (response.status !== 200) return;
        return await response.data;
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
        return response.data.status
    }
}

export default GameService;
