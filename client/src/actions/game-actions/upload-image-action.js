import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for requesting image upload
const UploadImageRequestAction = () => ({
    type: actionTypes.UPLOAD_IMAGE_REQUEST,
});

// Action creator for successful image upload
const UploadImageSuccessAction = (action) => ({
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    payload: action,
});

// Action creator for failed image upload
const UploadImageFailureAction = () => ({
    type: actionTypes.UPLOAD_IMAGE_FAILURE,
});

// Function to upload images
export const uploadImagesFunc = (action) => {
    // Initialize actionRequested object with initial values
    const actionRequested = {
        action: action,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to upload images is being made
        dispatch(UploadImageRequestAction());
        try {
            // Call the API service to upload the images
            await Client.uploadImages(action);
            // Dispatch the action indicating successful image upload
            dispatch(UploadImageSuccessAction(actionRequested));
        } catch (e) {
            // If an error occurs during the API call, update the actionRequested object with the error message
            actionRequested.errorMsg = e;
            // Dispatch the action indicating failure in image upload
            dispatch(UploadImageFailureAction(actionRequested));
        }
    };
};
