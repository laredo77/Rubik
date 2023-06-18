import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for setting mosaic match request
const setMosaicMatchRequestAction = () => ({
    type: actionTypes.SET_MOSAIC_MATCH_REQUEST,
});

// Action creator for successful setting of mosaic match
const setMosaicMatchSuccessAction = (gameLevel) => ({
    type: actionTypes.SET_MOSAIC_MATCH_SUCCESS,
    payload: gameLevel,
});

// Action creator for failure in setting mosaic match
const setMosaicMatchFailureAction = () => ({
    type: actionTypes.SET_MOSAIC_MATCH_FAILURE,
});

// Action creator for joining mosaic match request
const joinMosaicMatchRequestAction = () => ({
    type: actionTypes.JOIN_MOSAIC_MATCH_REQUEST,
});

// Action creator for successful joining of mosaic match
const joinMosaicMatchSuccessAction = (gameLevel) => ({
    type: actionTypes.JOIN_MOSAIC_MATCH_SUCCESS,
    payload: gameLevel,
});

// Action creator for failure in joining mosaic match
const joinMosaicMatchFailureAction = (gameLevel) => ({
    type: actionTypes.JOIN_MOSAIC_MATCH_FAILURE,
    payload: gameLevel,
});

// Async function to set mosaic match
export const setMosaicMatch = (user, level) => {
    let gameLevel = {
        manager: user,
        level_id: level,
        isReady: false,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to set mosaic match is being made
        dispatch(setMosaicMatchRequestAction());
        try {
            const response = await Client.newGame(gameLevel);
            gameLevel = {
                ...gameLevel,
                game_id: response.game_id,
                password: response.password,
                cubes: response.cubes
            }
            // Dispatch the action indicating successful setting of mosaic match
            dispatch(setMosaicMatchSuccessAction(gameLevel));
        } catch (e) {
            gameLevel.errorMsg = e;
            // Dispatch the action indicating failure in setting mosaic match
            dispatch(setMosaicMatchFailureAction(gameLevel));
        }
    };
};

// Async function to join mosaic match
export const joinMosaicMatch = (gameId, gamePwd, user) => {
    let gameLevel = {
        game_id: gameId,
        password: gamePwd,
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to join mosaic match is being made
        dispatch(joinMosaicMatchRequestAction());
        try {
            const response = await Client.joinGame(gameLevel, user);
            gameLevel = {
                ...gameLevel,
                level_id: response.level_id,
                cubes: response.cubes,
                manager: response.manager,
            };
            // Dispatch the action indicating successful joining of mosaic match
            dispatch(joinMosaicMatchSuccessAction(gameLevel));
        } catch (e) {
            gameLevel.errorMsg = e;
            // Dispatch the action indicating failure in joining mosaic match
            dispatch(joinMosaicMatchFailureAction(gameLevel));
        }
    };
};