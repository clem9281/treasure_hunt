import React from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { Paper } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import Player from "./Player";
import Room from "./Room";

import { move } from "../actions";

import { usePositionFinder } from "../hooks";

const Map = ({
  dimension,
  gutter,
  playerColor,
  hideName,
  mapDict,
  player,
  move
}) => {
  let center = usePositionFinder(player, dimension, "#game-area");
  return (
    <GameArea id="game-area">
      <StyledRooms left={center.x} top={center.y} id="rooms">
        <Player
          dimension={dimension}
          player={player}
          playerColor={playerColor}
          gutter={gutter}
        />
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
                handler={move}
                mapDict={mapDict}
              />
            );
          })}
      </StyledRooms>
    </GameArea>
  );
};

const mapDispatchToProps = { move };
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
  overflow: hidden;
`;

export const StyledRooms = styled.div`
  background: transparent;
  position: relative;
  border: 1px solid blue;
  height: 100%;
  left: ${props => (props.left ? `${props.left}px` : 0)};
  top: ${props => !!props.top && `${props.top}px`};
  transition: left 0.3s, top 0.3s;
  transition-delay: 0.25s;
`;
