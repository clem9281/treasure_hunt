import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import uuidv4 from "uuid/v4";

import { GameCard } from "./styledComponents";

const FlexParent = styled.div`
  display: flex;
`;

const FlexChild = styled.div`
  width: 50%;
`;

const Inventory = ({ player }) => {
  return (
    <GameCard color="secondary" title="INVENTORY">
      <FlexParent>
        <FlexChild>
          {player.playerStatus.inventory.map(el => (
            <p key={uuidv4()}>{el}</p>
          ))}
        </FlexChild>
        <FlexChild></FlexChild>
      </FlexParent>
    </GameCard>
  );
};
const mapDispatchToProps = {};
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});

export default connect(mapStateToProps, mapDispatchToProps)(Inventory);
