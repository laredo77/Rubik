import actionTypes from "../constants";
import Client from "../../services/GameService";

const UploadImageRequestAction = () => ({
    type: actionTypes.UPLOAD_IMAGE_REQUEST,
});

const UploadImageSuccessAction = (action) => ({
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    payload: action,
});

const UploadImageFailureAction = () => ({
    type: actionTypes.UPLOAD_IMAGE_FAILURE,
});

export const uploadImagesFunc = (action) => {
    const actionRequested = {
        action: action,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(UploadImageRequestAction());
        try {
            await Client.uploadImages(action);
            dispatch(UploadImageSuccessAction(actionRequested));
        } catch (e) {
            actionRequested.errorMsg = e;
            dispatch(UploadImageFailureAction(actionRequested));
        }
    };
};
