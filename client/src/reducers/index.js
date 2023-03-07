import initMultiPlayerGameReducer from "./initMultiPlayerGameReducer";
import joinMultiPlayerGameReducer from "./joinMultiPlayerGameReducer";
import user from "./addNewUserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  initMultiPlayerGameReducer,
  user,
  joinMultiPlayerGameReducer,
});

export default allReducers;
