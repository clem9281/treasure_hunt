import React from "react";
import styled from "styled-components";

import { useCoordinates } from "../hooks";

import { blue } from "@material-ui/core/colors";

const StyledPlayer = styled.div`
  position: absolute;
  width: ${props => props.width && `${props.width}px`};
  height: ${props => props.width && `${props.width}px`};
  left: ${props => props.left && `${props.left}px`};
  top: ${props => props.top && `${props.top}px`};
  border-radius: 50%;
  background: ${props => props.background && `${props.background}`};
  display: inline-block;
  z-index: 999;
  transition: top 0.5s, left 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
`;

const Player = ({ user, dimension, player, hideName, playerColor, gutter }) => {
  const playerWidth = dimension / 4;

  const { x, y } = useCoordinates(player.currentRoom);
  if (x !== null && y !== null) {
    return (
      <StyledPlayer
        background={blue[500]}
        width={playerWidth}
        left={x * dimension + ((dimension - gutter) / 2 - playerWidth / 2)}
        top={y * dimension + ((dimension - gutter) / 2 - playerWidth / 2)}
      >
        {/* {!hideName && player.username[0].toUpperCase()} */}
      </StyledPlayer>
    );
  } else {
    return <></>;
  }
};

export default Player;
