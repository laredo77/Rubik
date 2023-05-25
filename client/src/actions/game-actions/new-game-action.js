import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for requesting to start a new game
const startNewGameRequestAction = () => ({
    type: actionTypes.START_NEW_GAME_REQUEST,
});

// Action creator for successful start of a new game
const startNewGameSuccessAction = (gameLevel) => ({
    type: actionTypes.START_NEW_GAME_SUCCESS,
    payload: gameLevel,
});

// Action creator for failure in starting a new game
const startNewGameFailureAction = () => ({
    type: actionTypes.START_NEW_GAME_FAILURE,
});

// Async function to start a new game
export const startNewGameFunc = (user, level) => {
    // Initialize game level object with initial values
    let gameLevel = {
        user: user,
        level: level,
        isReady: false,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to start a new game is being made
        dispatch(startNewGameRequestAction());
        try {
            // Call the API service to start a new game
            const response = await Client.newGame(gameLevel);
            // Update the gameLevel object with the response values
            gameLevel = {
                ...gameLevel,
                game_id: response.game_id,
                password: response.password,
                cubes: response.cubes,
            };
            // Dispatch the action indicating successful start of the new game
            dispatch(startNewGameSuccessAction(gameLevel));
        } catch (e) {
            // If an error occurs during the API call, update the gameLevel object with the error message
            gameLevel.errorMsg = e;
            // Dispatch the action indicating failure in starting the new game
            dispatch(startNewGameFailureAction());
        }
    };
};
