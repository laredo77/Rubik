import actionTypes from "./constants";
import Client from "../services/GeneralServices";

const addNewUserRequestAction = () => ({
  type: actionTypes.ADD_USER_REQUEST,
});

const addNewUserSuccessAction = (user) => ({
  type: actionTypes.ADD_USER_SUCCESS,
  payload: user,
});

const addNewUserFailureAction = () => ({
  type: actionTypes.ADD_USER_FAILURE,
});

const changePlayMode = (mode) => ({
  type: actionTypes.MODE_OF_PLAY,
  payload: mode,
});

export const addNewUser = (user) => {
  const userDetails = {
    email: user.email,
    isLoading: true,
    isError: false,
  };

  return async (dispatch) => {
    dispatch(addNewUserRequestAction());
    try {
      await Client.addNewUser(userDetails);
      dispatch(addNewUserSuccessAction(userDetails));
    } catch (e) {
      dispatch(addNewUserFailureAction());
    }
  };
};

export const modeListener = (mode) => {
  return async (dispatch) => {
    dispatch(changePlayMode(mode));
  };
};
