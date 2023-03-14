import gameReducer from "./GameReducer";
import joinMultiPlayerGameReducer from "./JoinMultiPlayerGameReducer";
import user from "./AddNewUserReducer";
import SingleCompetitionReducer from "./SingleCompetitionReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  gameReducer,
  user,
  joinMultiPlayerGameReducer,
  SingleCompetitionReducer,
});

export default allReducers;
