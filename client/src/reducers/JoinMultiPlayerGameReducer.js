import actionTypes from "../actions/constants";

const initialState = {
    id: undefined,
    password: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

const joinMultiPlayerGameReducer = (
    state = initialState,
    {type, payload}
) => {
    switch (type) {
        case actionTypes.JOIN_GAME_REQUEST: {
            return {...state, isLoading: true};
        }

        case actionTypes.JOIN_GAME_SUCCESS: {
            return {
                ...state,
                id: payload.id,
                password: payload.password,
                isLoading: false,
            };
        }

        case actionTypes.JOIN_GAME_FAILURE: {
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

export default joinMultiPlayerGameReducer;