import React from "react";
import styled from "styled-components";

import { Paper } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";

import Cooldown from "./Cooldown";

import Rooms from "./Rooms";

const Map = () => {
  return (
    <StyledParent>
      <Cooldown />
      <GameArea id="game-area">
        <Rooms />
      </GameArea>
    </StyledParent>
  );
};

export default Map;
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
