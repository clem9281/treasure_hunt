import { requestWithAuth } from "../util";

export const ROOM_INFO_START = "ROOM_INFO_START";
export const ROOM_INFO_FAIL = "ROOM_INFO_FAIL";
export const ROOM_INFO_SUCCESS = "ROOM_INFO_SUCCESS";

export const initializeRoom = token => {
  return async dispatch => {
    dispatch({ type: ROOM_INFO_START });
    try {
      let room = await requestWithAuth(token).get("/api/adv/init/");
      dispatch({ type: ROOM_INFO_SUCCESS, payload: room.data });
    } catch (error) {
      dispatch({ type: ROOM_INFO_FAIL });
    }
  };
};

export const playerStatus = () => {
  return async () => {
    return requestWithAuth().get();
  };
};
