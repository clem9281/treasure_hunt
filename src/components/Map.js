import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

import { connect } from "react-redux";

import { Paper } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import Cooldown from "./Cooldown";

import { movement } from "../actions";

import Rooms from "./Rooms";

import { toast } from "react-toastify";

const Map = ({
  dimension,
  gutter,
  playerColor,
  d3Data,
  links,
  player,
  movement,
  mapDict
}) => {
  // const svgRef = useRef(null);
  let moveHandler = useCallback(
    room => {
      let token = localStorage.getItem("token");
      if (player.isCoolingDown) {
        toast.info(`You can't move while you are cooling down`);
      } else {
        movement(
          token,
          player.currentRoom,
          mapDict,
          room,
          player.willPickUp,
          player
        );
      }
    },
    [mapDict, movement, player]
  );

  return (
    <StyledParent>
      <Cooldown />
      <GameArea id="game-area">
        <Rooms
          player={player}
          dimension={dimension}
          gutter={gutter}
          moveHandler={moveHandler}
          d3Data={d3Data}
          links={links}
        />
      </GameArea>
    </StyledParent>
  );
};

const mapDispatchToProps = { movement };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  dimension: mapState.dimension,
  gutter: mapState.gutter,
  player: playerState,
  d3Data: mapState.d3Data,
  links: mapState.links
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

export const StyledParent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
