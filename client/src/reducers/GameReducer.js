// File: gameReducer.js
// Description: This file contains the reducer function for managing the state of a game.
// It handles actions related to getting the game state and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    gameId: undefined,
    gameState: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

// Reducer function for managing the game state
const gameReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.GET_GAME_STATE_REQUEST: {
            // When a request to get the game state is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.GET_GAME_STATE_SUCCESS: {
          // When getting the game state is successful, update the state with the gameState, and isLoading values
          return {
                ...state,
                gameState: payload.gameState,
                isLoading: false,
            };
        }

        case actionTypes.GET_GAME_STATE_FAILURE: {
          // If there is a failure while getting the game state, set isError to true, isLoading to false, and store the error message
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

export default gameReducer;
