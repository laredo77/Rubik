import actionTypes from "../actions/constants";

const initialState = {
    images: undefined,
    isLoading: false,
    isError: false,
    errorMsg: "",
};

const imageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.UPLOAD_IMAGE_REQUEST: {
            return { ...state, isLoading: true };
        }

        case actionTypes.UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                images: payload.images,
                isLoading: false,
            };
        }

        case actionTypes.UPLOAD_IMAGE_FAILURE: {
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

export default imageReducer;
