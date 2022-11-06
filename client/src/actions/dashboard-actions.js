import actionTypes from "./constants";
import Client from "../services/DashboardService";

const getDomainDataRequestAction = () => ({
  type: actionTypes.GET_DOMAIN_DATA_REQUEST,
});

const getDomainDataSuccessAction = (content) => ({
  type: actionTypes.GET_DOMAIN_DATA_SUCCESS,
  payload: { content },
});

const getDomainDataFailureAction = (errorMsg) => ({
  type: actionTypes.GET_DOMAIN_DATA_FAILURE,
  payload: { errorMsg },
});

export const getDomainData = (domain) => {
  return async (dispatch) => {
    dispatch(getDomainDataRequestAction());
    try {
      await Client.tryFunc(domain);
      dispatch(getDomainDataSuccessAction(domain));
    } catch (e) {
      dispatch(getDomainDataFailureAction(e.response.data));
    }
  };
};
