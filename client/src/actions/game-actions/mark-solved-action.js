import actionTypes from "../constants";
import Client from "../../services/GameService";

const markSolvedRequestAction = () => ({
    type: actionTypes.MARK_SOLVED_REQUEST,
});

const markSolvedSuccessAction = (cubeGameDetails) => ({
    type: actionTypes.MARK_SOLVED_SUCCESS,
    payload: cubeGameDetails,
});

const markSolvedFailureAction = (cubeGameDetails) => ({
    type: actionTypes.MARK_SOLVED_FAILURE,
    payload: cubeGameDetails,
});

export const markSolved = (userEmail, levelId, cubeId, gameId) => {
    let cubeGameDetails = {
        user_email: userEmail,
        level_id: levelId,
        cube_id: cubeId,
        game_id: gameId,
        isLoading: true,
        isError: false,
        errorMsg: "",
    };

    return async (dispatch) => {
        dispatch(markSolvedRequestAction());
        try {
            const response = await Client.markSolved(cubeGameDetails);
            cubeGameDetails = {
                ...cubeGameDetails,
                user_email: response.user_email,
                level_id: response.level_id,
                cube_id: response.cube_id,
                game_id: response.game_id
            }
            dispatch(markSolvedSuccessAction(cubeGameDetails));
        } catch (e) {
            cubeGameDetails.errorMsg = e;
            dispatch(markSolvedFailureAction(cubeGameDetails));
        }
    };
};
