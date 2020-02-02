import {
  ROOM_INFO_START,
  ROOM_INFO_FAIL,
  ROOM_INFO_SUCCESS,
  MOVE_FAIL,
  MOVE_START,
  MOVE_SUCCESS,
  COOLDOWN_COMPLETE,
  IS_COOLING_DOWN
} from "../actions";

const initialState = {
  currentRoom: null,
  isCoolingDown: false,
  hasCoolDownError: false
};

export default function playerReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case ROOM_INFO_START:
      return { ...state };
    case ROOM_INFO_SUCCESS:
      return { ...state, currentRoom: action.payload };
    case ROOM_INFO_FAIL:
      return { ...state };

    case IS_COOLING_DOWN:
      return { ...state, isCoolingDown: true };

    case COOLDOWN_COMPLETE:
      return { ...state, isCoolingDown: false };

    case MOVE_START:
      return { ...state };
    case MOVE_SUCCESS:
      return { ...state, currentRoom: action.payload };
    case MOVE_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
}
