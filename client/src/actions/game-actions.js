import actionTypes from "./constants";
import Client from "../services/GeneralServices";

const newGameRequestAction = () => ({
  type: actionTypes.NEW_GAME_REQUEST,
});

const newGameSuccessAction = (gameDetails) => ({
  type: actionTypes.NEW_GAME_SUCCESS,
  payload: gameDetails,
});

const newGameFailureAction = (gameDetails) => ({
  type: actionTypes.NEW_GAME_FAILURE,
  payload: gameDetails,
});

export const initNewGame = (user, level) => {
  const gameDetails = {
    manager: user.email,
    level: level,
    isLoading: true,
    isError: false,
    errorMsg: "",
  };

  return async (dispatch) => {
    dispatch(newGameRequestAction());
    try {
      await Client.initNewGame(gameDetails); // should get response code+pwd
      dispatch(newGameSuccessAction(gameDetails));
    } catch (e) {
      gameDetails.errorMsg = e;
      dispatch(newGameFailureAction(gameDetails));
    }
  };
};
