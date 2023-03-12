import actionTypes from "../actions/constants";

const initialState = {
  manager: undefined,
  level: undefined,
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_GAME_STATE_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.GET_GAME_STATE_SUCCESS: {
      return {
        ...state,
        manager: payload.manager,
        level: payload.level,
        isLoading: false,
      };
    }

    case actionTypes.GET_GAME_STATE_FAILURE: {
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

export default gameReducer;