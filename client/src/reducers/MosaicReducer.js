// File: mosaicReducer.js
// Description: This file contains the reducer function for managing the state of a mosaic game.
// It handles actions related to setting up a mosaic match, updating match data, and handling errors.

import actionTypes from "../actions/constants";

// Initial state for the reducer
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

// Reducer function for managing the mosaic game state
const mosaicReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_MOSAIC_MATCH_REQUEST: {
            // When a request to set up a mosaic match is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.SET_MOSAIC_MATCH_SUCCESS: {
            // When setting up a mosaic match is successful, update the state with the manager, level_id, game_id, password, cubes, and isLoading values
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
            // If there is a failure while setting up a mosaic match, set isError to true, isLoading to false, and store the error message
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: payload.errorMsg,
            };
        }

        case actionTypes.JOIN_MOSAIC_MATCH_SUCCESS: {
            // When joining a mosaic match is successful, update the state with the manager, level_id, game_id, password, and cubes values
            return {
                ...state,
                manager: payload.manager,
                level_id: payload.level_id,
                game_id: payload.game_id,
                password: payload.password,
                cubes: payload.cubes,
            };
        }

        default:
            // For any other action type, return the current state
            return state;
    }
};

export default mosaicReducer;
