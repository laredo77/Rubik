import gameReducer from "./GameReducer";
import joinMultiPlayerGameReducer from "./JoinMultiPlayerGameReducer";
import user from "./AddNewUserReducer";
import SingleCompetitionReducer from "./SingleCompetitionReducer";
import {combineReducers} from "redux";
import imageReducer from "./UploadImagesReducer";
import matchReducer from "./MatchReducer";
import createMultiplayerGameReducer from "./CreateMultiplayerGameReducer";

const allReducers = combineReducers({
    gameReducer,
    user,
    joinMultiPlayerGameReducer,
    SingleCompetitionReducer,
    imageReducer,
    matchReducer,
    createMultiplayerGameReducer,
});

export default allReducers;
