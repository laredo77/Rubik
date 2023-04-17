import actionTypes from "../actions/constants";

const initialState = {
  email: "",
  img: undefined,
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
        img: payload.img,
        isLoading: payload.isLoading,
        isError: payload.isError,
      };
    }

    case actionTypes.ADD_USER_FAILURE: {
      return { ...state, isError: true, isLoading: false };
    }


    default:
      return state;
  }
};

export default addNewUserReducer;
