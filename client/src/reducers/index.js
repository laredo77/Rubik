import gameReducer from "./GameReducer";
import joinMultiPlayerGameReducer from "./JoinMultiPlayerGameReducer";
import user from "./AddNewUserReducer";
import SingleCompetitionReducer from "./SingleCompetitionReducer";
import { combineReducers } from "redux";
import imageReducer from "./UploadImagesReducer";
import matchReducer from "./MatchReducer";

const allReducers = combineReducers({
  gameReducer,
  user,
  joinMultiPlayerGameReducer,
  SingleCompetitionReducer,
  imageReducer,
  matchReducer,
});

export default allReducers;
