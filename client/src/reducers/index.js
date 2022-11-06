import getDomainData from "./getDomainDataReducer";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  getDomainData,
});

export default allReducers;