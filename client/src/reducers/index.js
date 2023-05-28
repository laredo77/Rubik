import gameReducer from "./GameReducer";
import user from "./AddNewUserReducer";
import SingleCompetitionReducer from "./SingleCompetitionReducer";
import {combineReducers} from "redux";
import imageReducer from "./UploadImagesReducer";
import matchReducer from "./MatchReducer";
import mosaicReducer from "./MosaicReducer";

const allReducers = combineReducers({
    gameReducer,
    user,
    SingleCompetitionReducer,
    imageReducer,
    matchReducer,
    mosaicReducer,
});

export default allReducers;
