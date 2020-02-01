import React from "react";
import styled from "styled-components";
import Player from "./Player";

import Room from "./Room";

import roomIndex from "../util/map.json";

export default function Map({
  center,
  dimension,
  gutter,
  player,
  playerColor,
  hideName
}) {
  return (
    <StyledRooms left={center.x} top={center.y}>
      {/* <Player
        dimension={dimension}
        player={player}
        playerColor={playerColor}
        hideName={hideName}
      /> */}
      {roomIndex &&
        Object.keys(roomIndex).map(room => {
          return (
            <Room
              //   red={room === player.room.title}
              room={roomIndex[room]}
              key={room}
              dimension={dimension}
              gutter={gutter}
              //   player={player}
            />
          );
        })}
    </StyledRooms>
  );
}

export const StyledRooms = styled.div`
  background: transparent;
  position: relative;
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => !!props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;
