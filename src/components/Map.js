import React, { useState } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { Paper } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import Player from "./Player";
import Room from "./Room";
import Cooldown from "./Cooldown";

import { movement } from "../actions";

import { usePositionFinder } from "../hooks";

const Map = ({ dimension, gutter, playerColor, mapDict, player, movement }) => {
  let center = usePositionFinder(player, dimension, "#game-area");
  return (
    <GameArea id="game-area">
      <Cooldown />
      <StyledRooms
        left={center.x}
        top={center.y}
        id="rooms"
        // height={height}
        // width={width}
      >
        <Player
          dimension={dimension}
          player={player}
          playerColor={playerColor}
          gutter={gutter}
        />
        <FakeDiv></FakeDiv>
        {mapDict &&
          Object.keys(mapDict).map(room => {
            return (
              <Room
                //   red={room === player.room.title}
                room={mapDict[room]}
                key={room}
                dimension={dimension}
                gutter={gutter}
                player={player}
                move={movement}
                mapDict={mapDict}
              />
            );
          })}
        {/* </FakeDiv> */}
      </StyledRooms>
    </GameArea>
  );
};

const mapDispatchToProps = { movement };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  dimension: mapState.dimension,
  gutter: mapState.gutter,
  player: playerState
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
export const GameArea = styled(Paper)`
  box-shadow: none;
  padding: 0;
  height: 100%;
  border: 3px solid ${yellow[700]};
  position: relative;
  overflow: scroll;
  max-height: 500px;
`;

export const StyledRooms = styled.div`
  display: block;
  background: transparent;
  position: relative;
  width: ${props => (props.width ? `${props.width}px` : "100%")};
  height: ${props => (props.height ? `${props.height}px` : "100%")};
  padding: 0;
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => !!props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;

export const FakeDiv = styled.div`
  // position: relative;
  // height: 2000px;
  // top: -29000px;
  // display: block
`;
