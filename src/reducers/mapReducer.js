const initialState = {};

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case "A CASE":
      return { ...state };
      break;
    default:
      return { ...state };
  }
}
