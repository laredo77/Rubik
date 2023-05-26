// File: joinMultiPlayerGameReducer.js
// Description: This file contains the reducer function for managing the state of joining a multiplayer game.
// It handles actions related to joining a game and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    id: undefined,
    password: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

// Reducer function for joining a multiplayer game
const joinMultiPlayerGameReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.JOIN_GAME_REQUEST: {
            // When a request to join a game is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.JOIN_GAME_SUCCESS: {
            // When joining a game is successful, update the state with the id, password, and isLoading values
            return {
                ...state,
                id: payload.id,
                password: payload.password,
                isLoading: false,
            };
        }

        case actionTypes.JOIN_GAME_FAILURE: {
            // If there is a failure while joining a game, set isError to true, isLoading to false, and store the error message
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

export default joinMultiPlayerGameReducer;
