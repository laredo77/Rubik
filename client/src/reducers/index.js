import teamPlayGameReducer from "./teamPlayGameReducer";
import addNewUserReducer from "./addNewUserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  teamPlayGameReducer,
  addNewUserReducer,
});

export default allReducers;
