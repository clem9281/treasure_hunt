import React from "react";
import styled from "styled-components";

import { useCoordinates } from "../hooks";

import { Tooltip } from "@material-ui/core";

import { toast } from "react-toastify";

import { teal, deepPurple, red } from "@material-ui/core/colors";

const Room = ({ room, player, dimension, red, gutter, move, mapDict }) => {
  const doorWidth = gutter + 4;
  let { x, y } = useCoordinates(room.info);
  let token = localStorage.getItem("token");
  let clickHandler = e => {
    if (player.isCoolingDown) {
      toast.info(`You can't move while you are cooling down`);
    } else {
      move(
        token,
        player.currentRoom,
        mapDict,
        e.target.id,
        player.willPickUp,
        player
      );
    }
  };
  return (
    <>
      {!!room.directions.n && (
        <Door
          left={x * dimension + doorWidth - 3}
          top={y * dimension + doorWidth - 2}
          dimension={dimension}
          width={doorWidth}
          northRoom
        />
      )}
      {!!room.directions.w && (
        <Door
          left={x * dimension - doorWidth + 2}
          top={y * dimension - doorWidth + 3}
          dimension={dimension}
          width={doorWidth}
          westRoom
        />
      )}
      <Tooltip arrow title={`Room: ${room.info.room_id}`}>
        <StyledRoom
          x={x * dimension}
          y={y * dimension}
          dimension={dimension - gutter}
          id={room.info.room_id}
          coord={room.coordinates}
          onClick={clickHandler}
        ></StyledRoom>
      </Tooltip>
    </>
  );
};
/*
SHOP: 1
PIRATE RY: 467
*/

export default Room;

export const StyledRoom = styled.div.attrs(props => ({
  style: {
    height: props.dimension && `${props.dimension}px`,
    width: props.dimension && `${props.dimension}px`,
    left: props.x && `${props.x}px`,
    top: props.y && `-${props.y}px`,

    background:
      props.id && props.id === 1
        ? `${red[500]}`
        : props.id && props.id === 467
        ? `${deepPurple[500]}`
        : props.id && props.id === 55
        ? `${teal[500]}`
        : "#2e7d32"
  }
}))`
  // transform-origin: top left;
  border: 2px solid #3e2723;
  position: absolute;
  border-radius: 5px;
  & * {
    pointer-events: none;
  }
`;

export const Door = styled.div.attrs(props => ({
  style: {
    left: props.left && `${props.left}px`,
    top: props.top && `-${props.top}px`,
    width: props.dimension && `${props.width}px`,
    height: props.dimension && `${props.width}px`,
    borderTop: props.westRoom && `2px solid #3e2723`,
    borderBottom: props.westRoom && "2px solid #3e2723",
    borderLeft: props.northRoom && `2px solid #3e2723`,
    borderRight: props.northRoom && "2px solid #3e2723"
  }
}))`
  position: absolute;
  background: #2e7d32;
  z-index: 998;
`;
