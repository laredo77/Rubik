import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for requesting game state
const GetGameStateRequestAction = () => ({
    type: actionTypes.GET_GAME_STATE_REQUEST,
});

// Action creator for successful retrieval of game state
const GetGameStateSuccessAction = (gameDetails) => ({
    type: actionTypes.GET_GAME_STATE_SUCCESS,
    payload: gameDetails,
});

// Action creator for failure in retrieving game state
const GetGameStateFailureAction = (gameDetails) => ({
    type: actionTypes.GET_GAME_STATE_FAILURE,
    payload: gameDetails,
});

// Async function to retrieve game state
export const getGameState = (user, level) => {
    // Initialize game details object with initial values
    let gameDetails = {
        manager: user.email,
        level: level,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request for game state is being made
        dispatch(GetGameStateRequestAction());
        try {
            // Call the API service to get the game state
            const response = await Client.getGameState(gameDetails);
            // Update the gameDetails object with the response values
            gameDetails = {
                ...gameDetails,
                gameId: response.gameId,
                password: response.password,
                gameState: response.gameState,
            };
            // Dispatch the action indicating successful retrieval of game state
            dispatch(GetGameStateSuccessAction(gameDetails));
        } catch (e) {
            // If an error occurs during API call, update the gameDetails object with the error message
            gameDetails.errorMsg = e;
            // Dispatch the action indicating failure in retrieving game state
            dispatch(GetGameStateFailureAction(gameDetails));
        }
    };
};

