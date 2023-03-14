import actionTypes from "../constants";
import Client from "../../services/GameService";

const UploadImageRequestAction = () => ({
    type: actionTypes.UPLOAD_IMAGE_REQUEST,
});

const UploadImageSuccessAction = (images) => ({
    type: actionTypes.UPLOAD_IMAGE_SUCCESS,
    payload: images,
});

const UploadImageFailureAction = () => ({
    type: actionTypes.UPLOAD_IMAGE_FAILURE,
});

export const uploadImagesFunc = (images) => {
    const imagesUploaded = {
        images: images,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(UploadImageRequestAction());
        try {
            await Client.uploadImages(images);
            dispatch(UploadImageSuccessAction(imagesUploaded));
        } catch (e) {
            imagesUploaded.errorMsg = e;
            dispatch(UploadImageFailureAction(imagesUploaded));
        }
    };
};
