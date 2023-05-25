import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creator for requesting to join a game
const joinGameRequestAction = () => ({
    type: actionTypes.JOIN_GAME_REQUEST,
});

// Action creator for successful joining of a game
const joinGameSuccessAction = (gameDetails) => ({
    type: actionTypes.JOIN_GAME_SUCCESS,
    payload: gameDetails,
});

// Action creator for failure in joining a game
const joinGameFailureAction = (gameDetails) => ({
    type: actionTypes.JOIN_GAME_FAILURE,
    payload: gameDetails,
});

// Async function to join a game
export const joinGame = (gameId, gamePwd, user) => {
    // Initialize game details object with initial values
    let gameDetails = {
        id: gameId,
        password: gamePwd,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to join a game is being made
        dispatch(joinGameRequestAction());
        try {
            // Call the API service to join the game
            const response = await Client.joinGame(gameDetails, user);
            // Update the gameDetails object with the response values
            gameDetails = {
                ...gameDetails,
                id: response.game_id,
                password: response.password,
            };
            // Dispatch the action indicating successful joining of the game
            dispatch(joinGameSuccessAction(gameDetails));
        } catch (e) {
            // If an error occurs during the API call, update the gameDetails object with the error message
            gameDetails.errorMsg = e;
            // Dispatch the action indicating failure in joining the game
            dispatch(joinGameFailureAction(gameDetails));
        }
    };
};

