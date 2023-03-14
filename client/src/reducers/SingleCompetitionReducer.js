import actionTypes from "../actions/constants";

const initialState = {
  player: undefined,
  level: undefined,
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const singleCompetitionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.SET_GAME_LEVEL_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.SET_GAME_LEVEL_SUCCESS: {
      return {
        ...state,
        player: payload.player,
        level: payload.level,
        isLoading: false,
      };
    }

    case actionTypes.SET_GAME_LEVEL_FAILURE: {
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

export default singleCompetitionReducer;
