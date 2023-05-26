// File: singleCompetitionReducer.js
// Description: This file contains the reducer function for managing the state of a single competition game.
// It handles actions related to setting the game level and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    player: undefined,
    level: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

// Reducer function for managing the single competition game state
const singleCompetitionReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_GAME_LEVEL_REQUEST: {
            // When a request to set the game level is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.SET_GAME_LEVEL_SUCCESS: {
            // When setting the game level is successful, update the state with the player, level, and isLoading values
            return {
                ...state,
                player: payload.player,
                level: payload.level,
                isLoading: false,
            };
        }

        case actionTypes.SET_GAME_LEVEL_FAILURE: {
            // If there is a failure while setting the game level, set isError to true, isLoading to false, and store the error message
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: payload.errorMsg,
            };
        }

        default:
            // For any other action type, return the current state
            return state;
    }
};

export default singleCompetitionReducer;
