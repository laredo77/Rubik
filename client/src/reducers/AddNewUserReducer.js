// File: addNewUserReducer.js
// Description: This file contains the reducer function for adding a new user.
// It handles different actions related to adding a user and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    email: "",
    img: undefined,
    isLoading: false,
    isError: false,
};

// Reducer function for adding a new user
const addNewUserReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.ADD_USER_REQUEST: {
            // When a request to add a user is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.ADD_USER_SUCCESS: {
            // When adding a user is successful, update the state with the user's email,
            // image, isLoading, and isError values
            return {
                ...state,
                email: payload.email,
                img: payload.img,
                isLoading: payload.isLoading,
                isError: payload.isError,
            };
        }

        case actionTypes.ADD_USER_FAILURE: {
            // If there is a failure while adding a user, set isError to true and isLoading to false
            return {...state, isError: true, isLoading: false};
        }

        default:
            // For any other action type, return the current state
            return state;
    }
};

export default addNewUserReducer;
