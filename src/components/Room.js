import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledRoom = styled.div.attrs(props => ({
  style: {
    height: props.dimension && `${props.dimension}px`,
    width: props.dimension && `${props.dimension}px`,
    left: props.x && `${props.x}px`,
    top: props.y && `${props.y}px`
  }
}))`
  border: 2px solid #3e2723;
  background: #2e7d32;
  position: absolute;
  border-radius: 5px;
  & * {
    pointer-events: none;
  }
`;

const Door = styled.div.attrs(props => ({
  style: {
    left: props.left && `${props.left}px`,
    top: props.top && `${props.top}px`,
    width: props.dimension && `${props.width}px`,
    height: props.dimension && `${props.width}px`,
    "border-top": props.westRoom && `2px solid #3e2723`,
    "border-bottom": props.westRoom && "2px solid #3e2723",
    "border-left": props.northRoom && `2px solid #3e2723`,
    "border-right": props.northRoom && "2px solid #3e2723"
  }
}))`
  position: absolute;
  background: #2e7d32;
  z-index: 998;
`;

const Room = ({ room, player, dimension, red, gutter }) => {
  const doorWidth = gutter + 4;
  let [{ x, y }, setCoordinates] = useState({ x: null, y: null });
  useEffect(() => {
    console.log(room);
    let x = Number(room.info.coordinates.split(",")[0].slice(1));
    let yString = room.info.coordinates.split(",")[1];
    let y = Number(yString.slice(0, yString.length - 1));
    setCoordinates({ x, y });
  }, [dimension, room]);
  return (
    <>
      {!!room.directions.n && (
        <Door
          left={x * dimension + doorWidth - 3}
          top={y * dimension - doorWidth + 2}
          dimension={dimension}
          width={doorWidth}
          northRoom
        />
      )}
      {!!room.directions.w && (
        <Door
          left={x * dimension - doorWidth + 2}
          top={y * dimension + doorWidth / 1.5}
          dimension={dimension}
          width={doorWidth}
          westRoom
        />
      )}
      <StyledRoom
        x={x * dimension}
        y={y * dimension}
        dimension={dimension - gutter}
        id={room.room_id}
      ></StyledRoom>
    </>
  );
};

export default Room;
