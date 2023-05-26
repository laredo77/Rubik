import actionTypes from "../constants";
import Client from "../../services/GameService";

const setMosaicMatchRequestAction = () => ({
    type: actionTypes.SET_MOSAIC_MATCH_REQUEST,
});

const setMosaicMatchSuccessAction = (gameLevel) => ({
    type: actionTypes.SET_MOSAIC_MATCH_SUCCESS,
    payload: gameLevel,
});

const setMosaicMatchFailureAction = () => ({
    type: actionTypes.SET_MOSAIC_MATCH_FAILURE,
});


const joinMosaicMatchRequestAction = () => ({
    type: actionTypes.JOIN_MOSAIC_MATCH_REQUEST,
});

const joinMosaicMatchSuccessAction = (gameLevel) => ({
    type: actionTypes.JOIN_MOSAIC_MATCH_SUCCESS,
    payload: gameLevel,
});

const joinMosaicMatchFailureAction = (gameLevel) => ({
    type: actionTypes.JOIN_MOSAIC_MATCH_FAILURE,
    payload: gameLevel,
});


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
        dispatch(setMosaicMatchRequestAction());
        try {
            const response = await Client.newGame(gameLevel);
            gameLevel = {
                ...gameLevel,
                game_id: response.game_id,
                password: response.password,
                cubes: response.cubes
            }
            dispatch(setMosaicMatchSuccessAction(gameLevel));
        } catch (e) {
            gameLevel.errorMsg = e;
            dispatch(setMosaicMatchFailureAction(gameLevel));
        }
    };
};


export const joinMosaicMatch = (gameId, gamePwd, user) => {
    let gameLevel = {
        game_id: gameId,
        password: gamePwd,
    };

    return async (dispatch) => {
        dispatch(joinMosaicMatchRequestAction());
        try {
            const response = await Client.joinGame(gameLevel, user);
            gameLevel = {
                ...gameLevel,
                level_id: response.level_id,
                cubes: response.cubes,
                manager: response.manager,
            };
            dispatch(joinMosaicMatchSuccessAction(gameLevel));
        } catch (e) {
            gameLevel.errorMsg = e;
            dispatch(joinMosaicMatchFailureAction(gameLevel));
        }
    };
};
