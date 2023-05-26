import actionTypes from "./constants";
import Client from "../services/GeneralServices";

// Action creator for requesting to add a new user
const addNewUserRequestAction = () => ({
    type: actionTypes.ADD_USER_REQUEST,
});

// Action creator for successful addition of a new user
const addNewUserSuccessAction = (user) => ({
    type: actionTypes.ADD_USER_SUCCESS,
    payload: user,
});

// Action creator for failed addition of a new user
const addNewUserFailureAction = () => ({
    type: actionTypes.ADD_USER_FAILURE,
});

// Function to add a new user
export const addNewUser = (user) => {
    // Initialize userDetails object with initial values
    const userDetails = {
        email: user.email,
        img: user.img,
        isLoading: true,
        isError: false,
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to add a new user is being made
        dispatch(addNewUserRequestAction());
        try {
            // Call the API service to add the new user
            await Client.addNewUser(userDetails);
            // Dispatch the action indicating successful addition of the new user
            dispatch(addNewUserSuccessAction(userDetails));
        } catch (e) {
            // If an error occurs during the API call, dispatch the action indicating failure in adding the new user
            dispatch(addNewUserFailureAction());
        }
    };
};
