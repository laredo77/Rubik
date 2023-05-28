import actionTypes from "../constants";
import Client from "../../services/GameService";

// Action creators for setting the match
const setMatchRequestAction = () => ({
    type: actionTypes.SET_MATCH_REQUEST,
});

const setMatchSuccessAction = (match) => ({
    type: actionTypes.SET_MATCH_SUCCESS,
    payload: match,
});

const setMatchFailureAction = (match) => ({
    type: actionTypes.SET_MATCH_FAILURE,
    payload: match,
});

// Action creator for updating match status
const setMatchStatus = (match) => ({
    type: actionTypes.IS_MATCH_READY,
    payload: match,
});

// Action creators for joining the match
const joinMatchRequestAction = () => ({
    type: actionTypes.JOIN_MATCH_REQUEST,
});

const joinMatchSuccessAction = (match) => ({
    type: actionTypes.JOIN_MATCH_SUCCESS,
    payload: match,
});

const joinMatchFailureAction = (match) => ({
    type: actionTypes.JOIN_MATCH_FAILURE,
    payload: match,
});

// Function to set the match
export const setMatch = (user, level) => {
    // Initialize match object with initial values
    let match = {
        manager: user.email,
        level: level,
        isReady: false,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        // Dispatch the action indicating that a request to set the match is being made
        dispatch(setMatchRequestAction());
        try {
            // Call the API service to set the match
            const response = await Client.setMatch(match);
            // Update the match object with the response values
            match = {
                ...match,
                gameId: response.matchId,
                password: response.password,
            };
            // Dispatch the action indicating successful setting of the match
            dispatch(setMatchSuccessAction(match));
        } catch (e) {
            // If an error occurs during the API call, update the match object with the error message
            match.errorMsg = e;
            // Dispatch the action indicating failure in setting the match
            dispatch(setMatchFailureAction(match));
        }
    };
};

// Function to get the match status
export const getMatchStatus = (user) => {
    // Initialize match status object with initial values
    let matchStat = {
        manager: user.email,
        status: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(setMatchRequestAction());
        try {
            const response = await Client.matchStatus(matchStat);
            if (response === 200) {
                // Update the match status object to indicate a successful status
                matchStat = {
                    ...matchStat,
                    status: true,
                };
            } else {
                // Update the match status object to indicate an unsuccessful status
                matchStat = {
                    ...matchStat,
                    status: false,
                };
            }
            // Dispatch the action to update the match status
            dispatch(setMatchStatus(matchStat));
        } catch (e) {
            // If an error occurs during the API call, update the match status object with the error message
            matchStat.errorMsg = e;
        }
    };
};

// Function to join the match
export const joinMatch = (matchDetails) => {
    let match = {
        gameId: matchDetails.gameId,
        password: matchDetails.password,
        user: matchDetails.user,
    };

    return async (dispatch) => {
        dispatch(joinMatchRequestAction());
        try {
            const response = await Client.joinMatch(match);
            if (response === 200) {
                // Update the match object to indicate a successful join
                match = {
                    ...match,
                    status: true,
                };
            }
            // Dispatch the action indicating successful joining of the match
            dispatch(joinMatchSuccessAction(match));
            // Dispatch the action to update the match status
            dispatch(setMatchStatus(match));
        } catch (e) {
            // If an error occurs during the API call, update the match object with the error message
            match.errorMsg = e;
            // Dispatch the action indicating failure in joining the match
            dispatch(joinMatchFailureAction(match));
        }
    };
};
