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
            const response = await Client.joinGame(gameDetails, user);
            gameDetails = {
                ...gameDetails,
                id: response.game_id,
                password: response.password
            }
            dispatch(joinGameSuccessAction(gameDetails));
        } catch (e) {
            gameDetails.errorMsg = e;
            dispatch(joinGameFailureAction(gameDetails));
        }
    };
};
