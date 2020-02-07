import { LOADED_MAP } from "../actions";

const initialState = {
  rooms: null,
  dimension: null,
  gutter: null
};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case LOADED_MAP:
      return {
        ...state,
        rooms: action.payload.mapDict,
        d3Data: action.payload.d3Data,
        links: action.payload.links,
        dimension: 45,
        gutter: 10
      };
    default:
      return { ...state };
  }
}
