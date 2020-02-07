import {
  ROOM_INFO_START,
  ROOM_INFO_FAIL,
  ROOM_INFO_SUCCESS,
  MOVE_FAIL,
  MOVE_START,
  MOVE_SUCCESS,
  COOLDOWN_COMPLETE,
  IS_COOLING_DOWN,
  IS_CALCULATING_ROUTE,
  ROUTE_CALCULATED,
  PLAYER_STATUS_FAIL,
  PLAYER_STATUS_START,
  PLAYER_STATUS_SUCCESS,
  SET_WILL_PICKUP
} from "../actions";

const initialState = {
  currentRoom: null,
  isCoolingDown: false,
  hasCoolDownError: false,
  calculating: false,
  willPickUp: false,
  playerStatus: null
};

export default function playerReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case PLAYER_STATUS_START:
      return { ...state };
    case PLAYER_STATUS_SUCCESS:
      return { ...state, playerStatus: action.payload };
    case PLAYER_STATUS_FAIL:
      return { ...state };

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

    case IS_CALCULATING_ROUTE:
      return { ...state, calculating: true };
    case ROUTE_CALCULATED:
      return { ...state, calculating: false };

    case MOVE_START:
      return { ...state };
    case MOVE_SUCCESS:
      return { ...state, currentRoom: action.payload };
    case MOVE_FAIL:
      return { ...state };

    case SET_WILL_PICKUP:
      return { ...state, willPickUp: action.payload };
    default:
      return { ...state };
  }
}
