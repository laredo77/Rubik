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
        if (response.status !== 200) return;
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

    static async uploadImages({action, clickedImage}) {
        const response = await axios.post(
            "http://localhost:3001/game/upload-images",
            {action, clickedImage},
            {
                headers: {
                    message: action,
                },
            }
        );
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
