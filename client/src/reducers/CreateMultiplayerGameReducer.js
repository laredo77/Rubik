// File: createMultiplayerGameReducer.js
// Description: This file contains the reducer function for creating a new multiplayer game.
// It handles different actions related to creating a game and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    game_id: undefined,
    user: undefined,
    password: undefined,
    level: undefined,
    cubes: [],
    isLoading: false,
    isError: false,
    errorMsg: "",
};

// Reducer function for creating a new multiplayer game
const createMultiplayerGameReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.START_NEW_GAME_REQUEST: {
            // When a request to start a new game is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.START_NEW_GAME_SUCCESS: {
            // When starting a new game is successful, update the state with the game_id, user, password, level, cubes, and isLoading values
            return {
                ...state,
                game_id: payload.game_id,
                user: payload.user,
                password: payload.password,
                level: payload.level,
                cubes: payload.cubes,
                isLoading: false,
            };
        }

        case actionTypes.START_NEW_GAME_FAILURE: {
            // If there is a failure while starting a new game, set isError to true, isLoading to false, and store the error message
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

export default createMultiplayerGameReducer;
