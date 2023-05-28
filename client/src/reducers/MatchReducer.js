// File: matchReducer.js
// Description: This file contains the reducer function for managing the state of a match.
// It handles actions related to setting up a match, checking match readiness, and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    manager: undefined,
    level: undefined,
    gameId: "",
    password: "",
    status: false,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

// Reducer function for managing the match state
const matchReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.SET_MATCH_REQUEST: {
            // When a request to set up a match is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.SET_MATCH_SUCCESS: {
            // When setting up a match is successful, update the state with the manager, level, gameId, password, and isLoading values
            return {
                ...state,
                manager: payload.manager,
                level: payload.level,
                gameId: payload.gameId,
                password: payload.password,
                isLoading: false,
            };
        }

        case actionTypes.SET_MATCH_FAILURE: {
            // If there is a failure while setting up a match, set isError to true, isLoading to false, and store the error message
            return {
                ...state,
                isError: true,
                isLoading: false,
                errorMsg: payload.errorMsg,
            };
        }

        case actionTypes.IS_MATCH_READY: {
            // Update the match status based on the payload value
            return {
                ...state,
                status: payload.status,
            };
        }

        default:
            // For any other action type, return the current state
            return state;
    }
};

export default matchReducer;
