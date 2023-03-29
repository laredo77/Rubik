import actionTypes from "../actions/constants";

const initialState = {
  manager: undefined,
  level: undefined,
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const matchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_MATCH_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.SET_MATCH_SUCCESS: {
      return {
        ...state,
        manager: payload.manager,
        level: payload.level,
        isLoading: false,
      };
    }

    case actionTypes.SET_MATCH_FAILURE: {
      return {
        ...state,
        isError: true,
        isLoading: false,
        errorMsg: payload.errorMsg,
      };
    }

    default:
      return state;
  }
};

export default matchReducer;
