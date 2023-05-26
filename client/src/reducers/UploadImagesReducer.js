// File: imageReducer.js
// Description: This file contains the reducer function for managing the state of image uploading.
// It handles actions related to uploading images and updates the state accordingly.

import actionTypes from "../actions/constants";

// Initial state for the reducer
const initialState = {
    images: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

// Reducer function for managing the image state
const imageReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case actionTypes.UPLOAD_IMAGE_REQUEST: {
            // When a request to upload an image is made, set isLoading to true
            return {...state, isLoading: true};
        }

        case actionTypes.UPLOAD_IMAGE_SUCCESS: {
            // When image uploading is successful, update the state with the uploaded images and set isLoading to false
            return {
                ...state,
                images: payload.images,
                isLoading: false,
            };
        }

        case actionTypes.UPLOAD_IMAGE_FAILURE: {
            // If there is a failure during image uploading, set isError to true, isLoading to false, and store the error message
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

export default imageReducer;
