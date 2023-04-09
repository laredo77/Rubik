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

export const setMatch = (user, level) => {
  let match = {
    manager: user.email,
    level: level,
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
