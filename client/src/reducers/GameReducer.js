import actionTypes from "../actions/constants";

const initialState = {
    gameId: undefined,
    gameState: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

const gameReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.GET_GAME_STATE_REQUEST: {
            return {...state, isLoading: true};
        }

        case actionTypes.GET_GAME_STATE_SUCCESS: {
            return {
                ...state,
                gameState: payload.gameState,
                isLoading: false,
            };
        }

        case actionTypes.GET_GAME_STATE_FAILURE: {
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

export default gameReducer;
