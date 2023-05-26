import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for requesting game level update
const SetGameLevelRequestAction = () => ({
    type: actionTypes.SET_GAME_LEVEL_REQUEST,
});

// Action creator for successful game level update
const SetGameLevelSuccessAction = (gameDetails) => ({
    type: actionTypes.SET_GAME_LEVEL_SUCCESS,
    payload: gameDetails,
});

// Action creator for failed game level update
const SetGameLevelFailureAction = (gameDetails) => ({
    type: actionTypes.SET_GAME_LEVEL_FAILURE,
    payload: gameDetails,
});

// Function to set the game level
export const setGameLevel = (userDetails) => {
    // Initialize gameDetails object with initial values
    const gameDetails = {
        player: userDetails.player,
        level: userDetails.level,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to set the game level is being made
        dispatch(SetGameLevelRequestAction());
        try {
            // Call the API service to update the game level
            await Client.setCompGameLevel(gameDetails);
            // Dispatch the action indicating successful game level update
            dispatch(SetGameLevelSuccessAction(gameDetails));
        } catch (e) {
            // If an error occurs during the API call, update the gameDetails object with the error message
            gameDetails.errorMsg = e;
            // Dispatch the action indicating failure in game level update
            dispatch(SetGameLevelFailureAction(gameDetails));
        }
    };
};
