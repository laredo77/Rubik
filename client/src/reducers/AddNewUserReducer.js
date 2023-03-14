import actionTypes from "../actions/constants";

const initialState = {
  email: "",
  mode: "",
  isLoading: false,
  isError: false,
};

const addNewUserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.ADD_USER_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.ADD_USER_SUCCESS: {
      return {
        ...state,
        email: payload.email,
        isLoading: payload.isLoading,
        isError: payload.isError,
      };
    }

    case actionTypes.ADD_USER_FAILURE: {
      return { ...state, isError: true, isLoading: false };
    }

    case actionTypes.MODE_OF_PLAY: {
      return { ...state, mode: payload };
    }

    default:
      return state;
  }
};

export default addNewUserReducer;
