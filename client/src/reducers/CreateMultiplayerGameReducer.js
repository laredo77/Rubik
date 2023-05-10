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
    // console.log("Reducer called with action: ", type, payload);
    switch (type) {
        case actionTypes.START_NEW_GAME_REQUEST: {
            // console.log("START_NEW_GAME_REQUEST: ", state);
            return {...state, isLoading: true};
        }

        case actionTypes.START_NEW_GAME_SUCCESS: {
            // console.log("START_NEW_GAME_SUCCESS: ", state);
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
            // console.log("START_NEW_GAME_FAILURE: ", state);
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: payload.errorMsg,
            };
        }

        default:
            // console.log("DEFAULT: ", state);
            return state;
    }
};

export default createMultiplayerGameReducer;
