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
  const match = {
    manager: user.email,
    level: level,
    isLoading: true,
    isError: false,
    errorMsg: "",
  };

  return async (dispatch) => {
    dispatch(setMatchRequestAction());
    try {
      await Client.setMatch(match);
      dispatch(setMatchSuccessAction(match));
    } catch (e) {
      match.errorMsg = e;
      dispatch(setMatchFailureAction(match));
    }
  };
};
