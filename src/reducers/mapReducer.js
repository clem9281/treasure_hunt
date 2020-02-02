import { LOADED_MAP } from "../actions";

const initialState = {
  rooms: null,
  dimension: null,
  gutter: null
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_MAP:
      return { ...state, rooms: action.payload, dimension: 45, gutter: 10 };
    default:
      return { ...state };
  }
}
