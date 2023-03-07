import actionTypes from "../actions/constants";

const initialState = {
  manager: undefined,
  level: undefined,
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const initMultiPlayerGameReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case actionTypes.NEW_GAME_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.NEW_GAME_SUCCESS: {
      return {
        ...state,
        manager: payload.manager,
        level: payload.level,
        isLoading: false,
      };
    }

    case actionTypes.NEW_GAME_FAILURE: {
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

export default initMultiPlayerGameReducer;
