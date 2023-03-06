import teamPlayGameReducer from "./teamPlayGameReducer";
import user from "./addNewUserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  teamPlayGameReducer,
  user,
});

export default allReducers;
