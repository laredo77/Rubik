import actionTypes from "../constants";
import Client from "../../services/GameService";

const GetGameStateRequestAction = () => ({
    type: actionTypes.GET_GAME_STATE_REQUEST,
});

const GetGameStateSuccessAction = (gameDetails) => ({
    type: actionTypes.GET_GAME_STATE_SUCCESS,
    payload: gameDetails,
});

const GetGameStateFailureAction = (gameDetails) => ({
    type: actionTypes.GET_GAME_STATE_FAILURE,
    payload: gameDetails,
});

export const getGameState = (user, level) => {
    const gameDetails = {
        manager: user.email,
        level: level,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(GetGameStateRequestAction());
        try {
            await Client.getGameState(gameDetails); // should get response code+pwd
            dispatch(GetGameStateSuccessAction(gameDetails));
        } catch (e) {
            gameDetails.errorMsg = e;
            dispatch(GetGameStateFailureAction(gameDetails));
        }
    };
};
