import actionTypes from "../actions/constants";

const initialState = {
  content: "",
  isLoading: false,
  isError: false,
  errorMsg: "",
};

const getDomainDataReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_DOMAIN_DATA_REQUEST: {
      return { ...state, isLoading: true };
    }

    case actionTypes.GET_DOMAIN_DATA_SUCCESS: {
      return {
        ...state,
        content: payload.content,
        isLoading: false,
      };
    }

    case actionTypes.GET_DOMAIN_DATA_FAILURE: {
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

export default getDomainDataReducer;