import playerReducer from "./playerReducer";
import mapReducer from "./mapReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  playerState: playerReducer,
  mapState: mapReducer
});

export default rootReducer;
