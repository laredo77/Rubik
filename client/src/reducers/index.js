import gameReducer from "./GameReducer";
import joinMultiPlayerGameReducer from "./JoinMultiPlayerGameReducer";
import user from "./AddNewUserReducer";
import SingleCompetitionReducer from "./SingleCompetitionReducer";
import { combineReducers } from "redux";
import imageReducer from "./UploadImagesReducer";

const allReducers = combineReducers({
  gameReducer,
  user,
  joinMultiPlayerGameReducer,
  SingleCompetitionReducer,
  imageReducer,
});

export default allReducers;
