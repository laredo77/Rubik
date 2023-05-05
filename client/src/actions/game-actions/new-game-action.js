import actionTypes from "../constants";
import Client from "../../services/GameService";

const startNewGameRequestAction = () => ({
    type: actionTypes.START_NEW_GAME_REQUEST,
});

const startNewGameSuccessAction = (gameLevel) => ({
    type: actionTypes.START_NEW_GAME_SUCCESS,
    payload: gameLevel,
});

const startNewGameFailureAction = () => ({
    type: actionTypes.START_NEW_GAME_FAILURE,
});

export const startNewGameFunc = (user, level) => {
    let gameLevel = {
        user: user,
        level: level,
        isReady: false,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(startNewGameRequestAction());
        try {
            const response = await Client.newGame(gameLevel);
            gameLevel = {
                ...gameLevel,
                level: response.level
            }
            dispatch(startNewGameSuccessAction(gameLevel));
        } catch (e) {
            gameLevel.errorMsg = e;
            dispatch(startNewGameFailureAction());
        }
    };
};
