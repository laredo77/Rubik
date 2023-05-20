import actionTypes from "../constants";
import Client from "../../services/GameService";

const joinGameRequestAction = () => ({
    type: actionTypes.JOIN_GAME_REQUEST,
});

const joinGameSuccessAction = (gameDetails) => ({
    type: actionTypes.JOIN_GAME_SUCCESS,
    payload: gameDetails,
});

const joinGameFailureAction = (gameDetails) => ({
    type: actionTypes.JOIN_GAME_FAILURE,
    payload: gameDetails,
});

export const joinGame = (gameId, gamePwd, user) => {
    let gameDetails = {
        id: gameId,
        password: gamePwd,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(joinGameRequestAction());
        try {
            console.log("Joining game...", gameId, gamePwd, user);
            const response = await Client.joinGame(gameDetails, user);
            console.log("Join game response:", response);
            gameDetails = {
                ...gameDetails,
                id: response.game_id,
                password: response.password,
                level_id: response.level_id,
            };
            console.log("Join game success. Game details:", gameDetails);
            dispatch(joinGameSuccessAction(gameDetails));
        } catch (e) {
            console.error("Join game error:", e);
            gameDetails.errorMsg = e;
            dispatch(joinGameFailureAction(gameDetails));
        }
    };
};
