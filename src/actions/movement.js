import { Queue } from "../util/Queue";
import { moveRequest, examineRequest, pickupRequest } from "../api";

import { wait } from "./coolDown";
import { playerStatus } from "./player";

export const EXAMINE_START = "EXAMINE_START";
export const EXAMINE_FAIL = "EXAMINE_FAIL";
export const EXAMINE_SUCCESS = "EXAMINE_SUCCESS";

export const IS_CALCULATING_ROUTE = "IS_CALCULATING_ROUTE";
export const ROUTE_CALCULATED = "ROUTE_CALCULATED";

export const MOVE_START = "MOVE_START";
export const MOVE_FAIL = "MOVE_FAIL";
export const MOVE_SUCCESS = "MOVE_SUCCESS";

export const PICKUP_START = "PICKUP_START";
export const PICKUP_FAIL = "PICKUP_FAIL";
export const PICKUP_SUCCESS = "PICKUP_SUCCESS";

export const SET_WILL_PICKUP = "SET_WILL_PICKUP";

export const setWillPickUp = bool => {
  return {
    type: SET_WILL_PICKUP,
    payload: bool
  };
};

export const movement = (
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
        await dispatch(move(token, body, willPickUp, player));
        return;
      }
    }
    await dispatch(
      calculateRoute(token, current, nextRoom, dict, player, willPickUp)
    );
  };
};

export const calculateRoute = (
  token,
  current,
  nextRoom,
  dict,
  player,
  willPickUp
) => {
  return async dispatch => {
    dispatch({ type: IS_CALCULATING_ROUTE });
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
            await dispatch(move(token, body, willPickUp, player));
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

export const move = (token, body, willPickUp, player) => {
  return async dispatch => {
    try {
      let res = await moveRequest(token, body);
      dispatch({ type: MOVE_SUCCESS, payload: res.data });
      console.log(willPickUp, res.data.items);
      await dispatch(wait(res.data.cooldown));
      console.log(willPickUp);
      if (
        willPickUp &&
        res.data.items.length > 0 &&
        player.playerStatus.encumbrance < player.playerStatus.strength
      ) {
        await dispatch(pickup(token, res.data, player));
      }
    } catch (error) {
      // work out cooldown error, add wait
      dispatch({ type: MOVE_FAIL });
      console.log(error);
      console.dir(error);
    }
  };
};

export const examine = (token, body) => {
  return async dispatch => {
    dispatch({ type: EXAMINE_START });
    try {
      let res = await examineRequest(token, body);
      dispatch({ type: EXAMINE_SUCCESS });
      await dispatch(wait(res.data.cooldown));
      return res.data;
    } catch (error) {
      dispatch({ type: EXAMINE_FAIL });
      console.log(error);
      console.dir(error);
    }
  };
};

export const pickup = (token, room, player) => {
  return async dispatch => {
    console.log("called");
    console.log(room, player);
    dispatch({ type: PICKUP_START });
    for (let item of room.items) {
      let examineBody = {
        name: item
      };
      let itemInfo = await dispatch(examine(token, examineBody));
      console.log(itemInfo);
      if (
        player.playerStatus.encumbrance + itemInfo.weight <
        player.playerStatus.strength
      ) {
        let pickupBody = { name: item };
        try {
          let res = await pickupRequest(token, pickupBody);
          dispatch({ type: PICKUP_SUCCESS });
          await dispatch(wait(res.data.cooldown));
          await dispatch(playerStatus(token));
        } catch (error) {
          dispatch({ type: PICKUP_FAIL });
          console.log(error);
          console.dir(error);
        }
      }
    }
  };
};
