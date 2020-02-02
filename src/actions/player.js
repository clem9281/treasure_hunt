import { requestWithAuth } from "../util";

export const ROOM_INFO_START = "ROOM_INFO_START";
export const ROOM_INFO_FAIL = "ROOM_INFO_FAIL";
export const ROOM_INFO_SUCCESS = "ROOM_INFO_SUCCESS";

export const IS_CALCULATING_ROUTE = "";
export const MOVE_START = "MOVE_START";
export const MOVE_FAIL = "MOVE_FAIL";
export const MOVE_SUCCESS = "MOVE_SUCCESS";

export const IS_COOLING_DOWN = "IS_COOLING_DOWN";
export const COOLDOWN_COMPLETE = "COOLDOWN_COMPLETE";
export const HAS_COOLDOWN_ERROR = "HAS_COOLDOWN_ERROR";

export const wait = cooldown => {
  return async dispatch => {
    dispatch({ type: IS_COOLING_DOWN });
    return setTimeout(() => {
      dispatch({ type: COOLDOWN_COMPLETE });
    }, cooldown * 1000);
  };
};

export const initializeRoom = token => {
  return async dispatch => {
    dispatch({ type: ROOM_INFO_START });
    try {
      let room = await requestWithAuth(token).get("/api/adv/init/");
      dispatch({ type: ROOM_INFO_SUCCESS, payload: room.data });
      dispatch(wait(room.data.cooldown));
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

export const move = (token, currentRoom, dict, nextRoom) => {
  return async dispatch => {
    dispatch({ type: MOVE_START });
    let current = dict[currentRoom.room_id];
    let directions = ["n", "s", "e", "w"];
    console.log(current, nextRoom);
    for (let direction of directions) {
      console.log(current["directions"][direction]);

      if (
        current["directions"][direction] &&
        current["directions"][direction].room_id === Number(nextRoom)
      ) {
        let body = {
          direction,
          next_room_id: `${current["directions"][direction].room_id}`
        };
        console.log(body);
        try {
          let res = await requestWithAuth(token).post("/api/adv/move/", body);
          console.log(res);
        } catch (error) {
          dispatch({ type: MOVE_FAIL });
          console.log(error);
          console.dir(error);
        }
        break;
      }
    }
  };
};
