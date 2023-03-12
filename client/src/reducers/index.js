import gameReducer from "./GameReducer";
import joinMultiPlayerGameReducer from "./JoinMultiPlayerGameReducer";
import user from "./AddNewUserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  gameReducer,
  user,
  joinMultiPlayerGameReducer,
});

export default allReducers;
