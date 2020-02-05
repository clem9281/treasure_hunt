import { roomInfoRequest, statusRequest } from "../api";

import { wait } from "./coolDown";

export const ROOM_INFO_START = "ROOM_INFO_START";
export const ROOM_INFO_FAIL = "ROOM_INFO_FAIL";
export const ROOM_INFO_SUCCESS = "ROOM_INFO_SUCCESS";

export const PLAYER_STATUS_START = "PLAYER_STATUS_START";
export const PLAYER_STATUS_FAIL = "PLAYER_STATUS_FAIL";
export const PLAYER_STATUS_SUCCESS = "PLAYER_STATUS_SUCCESS";

export const initializeRoom = token => {
  return async dispatch => {
    dispatch({ type: ROOM_INFO_START });
    try {
      let room = await roomInfoRequest(token);
      dispatch({ type: ROOM_INFO_SUCCESS, payload: room.data });
      await dispatch(wait(room.data.cooldown));
    } catch (error) {
      dispatch({ type: ROOM_INFO_FAIL });
      console.dir(error);
    }
  };
};

export const playerStatus = token => {
  return async dispatch => {
    dispatch({ type: PLAYER_STATUS_START });
    try {
      let res = await statusRequest(token);
      dispatch({ type: PLAYER_STATUS_SUCCESS, payload: res.data });
      await dispatch(wait(res.data.cooldown));
    } catch (error) {
      dispatch({ type: PLAYER_STATUS_FAIL });
      console.dir(error);
    }
  };
};
