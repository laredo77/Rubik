import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for requesting to mark a cube as solved
const markSolvedRequestAction = () => ({
    type: actionTypes.MARK_SOLVED_REQUEST,
});

// Action creator for successful marking of a cube as solved
const markSolvedSuccessAction = (cubeGameDetails) => ({
    type: actionTypes.MARK_SOLVED_SUCCESS,
    payload: cubeGameDetails,
});

// Action creator for failure in marking a cube as solved
const markSolvedFailureAction = (cubeGameDetails) => ({
    type: actionTypes.MARK_SOLVED_FAILURE,
    payload: cubeGameDetails,
});

// Async function to mark a cube as solved
export const markSolved = (userEmail, levelId, cubeId, gameId) => {
    // Initialize cube game details object with initial values
    let cubeGameDetails = {
        user_email: userEmail,
        level_id: levelId,
        cube_id: cubeId,
        game_id: gameId,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to mark a cube as solved is being made
        dispatch(markSolvedRequestAction());
        try {
            // Call the API service to mark the cube as solved
            const response = await Client.markSolved(cubeGameDetails);
            // Update the cubeGameDetails object with the response values
            cubeGameDetails = {
                ...cubeGameDetails,
                user_email: response.user_email,
                level_id: response.level_id,
                cube_id: response.cube_id,
                game_id: response.game_id,
            };
            // Dispatch the action indicating successful marking of the cube as solved
            dispatch(markSolvedSuccessAction(cubeGameDetails));
        } catch (e) {
            // If an error occurs during the API call, update the cubeGameDetails object with the error message
            cubeGameDetails.errorMsg = e;
            // Dispatch the action indicating failure in marking the cube as solved
            dispatch(markSolvedFailureAction(cubeGameDetails));
        }
    };
};
