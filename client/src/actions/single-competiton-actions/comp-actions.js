import actionTypes from "../constants";
import Client from "../../services/GameService";

const SetGameLevelRequestAction = () => ({
  type: actionTypes.SET_GAME_LEVEL_REQUEST,
});

const SetGameLevelSuccessAction = (gameDetails) => ({
  type: actionTypes.SET_GAME_LEVEL_SUCCESS,
  payload: gameDetails,
});

const SetGameLevelFailureAction = (gameDetails) => ({
  type: actionTypes.SET_GAME_LEVEL_FAILURE,
  payload: gameDetails,
});

export const setGameLevel = (userDetails) => {
  const gameDetails = {
    player: userDetails.player,
    level: userDetails.level,
    isLoading: true,
    isError: false,
    errorMsg: "",
  };

  return async (dispatch) => {
    dispatch(SetGameLevelRequestAction());
    try {
      await Client.setCompGameLevel(gameDetails); // should get response code+pwd
      dispatch(SetGameLevelSuccessAction(gameDetails));
    } catch (e) {
      gameDetails.errorMsg = e;
      dispatch(SetGameLevelFailureAction(gameDetails));
    }
  };
};
