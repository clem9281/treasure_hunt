import {
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS
} from "../actions";

const initialState = {};

export default function userReducer(state = { ...initialState }, action) {
  switch (action.type) {
    case LOGIN_START:
      break;
    case LOGIN_SUCCESS:
      break;
    case LOGIN_FAILURE:
      break;
    case REGISTER_START:
      break;
    case REGISTER_SUCCESS:
      break;
    case REGISTER_FAILURE:
      break;
    default:
      return { ...state };
  }
}
