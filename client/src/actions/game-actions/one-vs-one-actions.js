import actionTypes from "../constants";
import Client from "../../services/GameService";

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

const setMatchStatus = (match) => ({
  type: actionTypes.IS_MATCH_READY,
  payload: match,
});


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


export const setMatch = (user, level) => {
  let match = {
    manager: user.email,
    level: level,
    isReady: false,
    isLoading: true,
    isError: false,
    errorMsg: "",
  };

  return async (dispatch) => {
    dispatch(setMatchRequestAction());
    try {
      const response = await Client.setMatch(match);
      match = {...match,
        gameId: response.gameId,
        password: response.password
      }
      dispatch(setMatchSuccessAction(match));
    } catch (e) {
      match.errorMsg = e;
      dispatch(setMatchFailureAction(match));
    }
  };
};


export const getMatchStatus = (user) => {
  let matchStat = {
    manager: user.email,
    status: false,
    errorMsg: "",
  };

  return async (dispatch) => {
    //console.log(matchStatus)
    dispatch(setMatchRequestAction());
    try {
      const response = await Client.matchStatus(matchStat);
      if (response == 200) {
        matchStat = {...matchStat,
          status: true,
        }
      } else {
        matchStat = {...matchStat,
          status: false,
        }
      }
      dispatch(setMatchStatus(matchStat));
    } catch (e) {
      matchStat.errorMsg = e;
    }
  };
};

export const joinMatch = (matchDetails) => {
  let match = {
    gameId: matchDetails.gameId,
    password: matchDetails.password,
    user: matchDetails.user,
  };

  return async (dispatch) => {
    dispatch(joinMatchRequestAction());
    try {
      await Client.joinMatch(match);
      dispatch(joinMatchSuccessAction(match));
    } catch (e) {
      match.errorMsg = e;
      dispatch(joinMatchFailureAction(match));
    }
  };
};
