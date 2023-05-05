import actionTypes from "../actions/constants";

const initialState = {
    gameId: undefined,
    user: undefined,
    password: undefined,
    level: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

const createMultiplayerGameReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case actionTypes.START_NEW_GAME_REQUEST: {
            return {...state, isLoading: true};
        }

        case actionTypes.START_NEW_GAME_SUCCESS: {
            return {
                ...state,
                gameId: payload.gameId,
                user: payload.user,
                password: payload.password,
                level: payload.level,
                isLoading: false,
            };
        }

        case actionTypes.START_NEW_GAME_FAILURE: {
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: payload.errorMsg,
            };
        }

        default:
            return state;
    }
};

export default createMultiplayerGameReducer;
