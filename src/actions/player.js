import { Queue } from "../util/Queue";
import {
  moveRequest,
  roomInfoRequest,
  examineRequest,
  pickupRequest,
  statusRequest
} from "../api";

export const ROOM_INFO_START = "ROOM_INFO_START";
export const ROOM_INFO_FAIL = "ROOM_INFO_FAIL";
export const ROOM_INFO_SUCCESS = "ROOM_INFO_SUCCESS";

export const EXAMINE_START = "EXAMINE_START";
export const EXAMINE_FAIL = "EXAMINE_FAIL";
export const EXAMINE_SUCCESS = "EXAMINE_SUCCESS";

export const PLAYER_STATUS_START = "PLAYER_STATUS_START";
export const PLAYER_STATUS_FAIL = "PLAYER_STATUS_FAIL";
export const PLAYER_STATUS_SUCCESS = "PLAYER_STATUS_SUCCESS";

export const IS_CALCULATING_ROUTE = "IS_CALCULATING_ROUTE";
export const ROUTE_CALCULATED = "ROUTE_CALCULATED";

export const MOVE_START = "MOVE_START";
export const MOVE_FAIL = "MOVE_FAIL";
export const MOVE_SUCCESS = "MOVE_SUCCESS";

export const IS_COOLING_DOWN = "IS_COOLING_DOWN";
export const COOLDOWN_COMPLETE = "COOLDOWN_COMPLETE";
export const HAS_COOLDOWN_ERROR = "HAS_COOLDOWN_ERROR";

export const SET_WILL_PICKUP = "SET_WILL_PICKUP";

export const willPickUp = bool => {
  return {
    type: SET_WILL_PICKUP,
    payload: bool
  };
};

export const wait = cooldown => {
  return async dispatch => {
    dispatch({ type: IS_COOLING_DOWN });
    return new Promise(resolve =>
      setTimeout(() => {
        dispatch({ type: COOLDOWN_COMPLETE });
        resolve();
      }, cooldown * 1000)
    );
  };
};

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
    } catch (error) {
      dispatch({ type: PLAYER_STATUS_FAIL });
      console.dir(error);
    }
  };
};

export const move = (
  token,
  currentRoom,
  dict,
  nextRoom,
  willPickUp,
  player
) => {
  return async dispatch => {
    dispatch({ type: MOVE_START });
    let current = dict[currentRoom.room_id];
    for (let direction of currentRoom.exits) {
      if (
        current["directions"][direction] &&
        current["directions"][direction].room_id === Number(nextRoom)
      ) {
        let body = {
          direction,
          next_room_id: `${current["directions"][direction].room_id}`
        };

        try {
          let res = await moveRequest(token, body);
          dispatch({ type: MOVE_SUCCESS, payload: res.data });
          await dispatch(wait(res.data.cooldown));
        } catch (error) {
          // work out cooldown error, add wait
          dispatch({ type: MOVE_FAIL });
          console.log(error);
          console.dir(error);
        }
        return;
      }
    }
    dispatch({ type: IS_CALCULATING_ROUTE });
    // find the path to the correct element
    let q = new Queue();
    q.enqueue([current]);
    let visited = new Set();
    while (q.len() > 0) {
      let path = q.dequeue();
      let element = path[path.length - 1];
      if (`${element.info.room_id}` === nextRoom) {
        dispatch({ type: ROUTE_CALCULATED });
        for (let room of path) {
          if (room.direction) {
            let body = {
              direction: room.direction,
              next_room_id: `${room.info.room_id}`
            };
            try {
              let res = await moveRequest(token, body);
              dispatch({ type: MOVE_SUCCESS, payload: res.data });
              await dispatch(wait(res.data.cooldown));

              if (res.data.items.length > 0 && willPickUp) {
                for (let item of res.data.items) {
                  let examineBody = {
                    name: item
                  };
                  dispatch({ type: EXAMINE_START });
                  let res = await examineRequest(token, examineBody);
                  dispatch({ type: EXAMINE_SUCCESS });
                  await dispatch(wait(res.data.cooldown));
                  if (player.playerStatus.encumbrance + res.data.weight < 100) {
                    let pickupBody = { name: item };
                    let res = await pickupRequest(token, pickupBody);
                    await dispatch(wait(res.data.cooldown));
                    dispatch(playerStatus(token));
                  }
                }
              }
            } catch (error) {
              // work out cooldown error, add wait
              dispatch({ type: MOVE_FAIL });
              console.log(error);
              console.dir(error);
            }
          }
        }
        break;
      }
      if (!visited.has(element.info.room_id)) {
        visited.add(element.info.room_id);
        for (let direction of Object.keys(element["directions"])) {
          let path_copy = path.slice();
          let neighbor = element["directions"][direction];
          path_copy.push({ ...dict[neighbor.room_id], direction });
          q.enqueue(path_copy);
        }
      }
    }
  };
};
