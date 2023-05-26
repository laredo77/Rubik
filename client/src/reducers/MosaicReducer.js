import actionTypes from "../actions/constants";

const initialState = {
    manager: undefined,
    level_id: undefined,
    game_id: "",
    password: "",
    cubes: [],
    isLoading: false,
    isError: false,
    errorMsg: "",
};

const mosaicReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_MOSAIC_MATCH_REQUEST: {
            return {...state, isLoading: true};
        }

        case actionTypes.SET_MOSAIC_MATCH_SUCCESS: {
            return {
                ...state,
                manager: payload.manager,
                level_id: payload.level_id,
                game_id: payload.game_id,
                password: payload.password,
                cubes: payload.cubes,
                isLoading: false,
            };
        }

        case actionTypes.SET_MOSAIC_MATCH_FAILURE: {
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: payload.errorMsg,
            };
        }

        case actionTypes.JOIN_MOSAIC_MATCH_SUCCESS: {
            return {
                ...state,
                manager: payload.manager,
                level_id: payload.level_id,
                game_id: payload.game_id,
                password: payload.password,
                cubes: payload.cubes,
            }
        }

        default:
            return state;
    }
};

export default mosaicReducer;
