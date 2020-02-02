import { ROOM_INFO_START, ROOM_INFO_FAIL, ROOM_INFO_SUCCESS } from "../actions";

const initialState = {
  currentRoom: null
};

export default function playerReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case ROOM_INFO_START:
      return { ...state };
    case ROOM_INFO_SUCCESS:
      return { ...state, currentRoom: action.payload };
    case ROOM_INFO_FAIL:
      return { ...state };
    default:
      return { ...state };
  }
}
