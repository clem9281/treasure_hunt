import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { GameCard } from "./styledComponents";

const FlexParent = styled.div`
  display: flex;
`;

const FlexChild = styled.div`
  width: 50%;
`;

const PlayerInformation = ({ player }) => {
  // console.log(player);
  return (
    <GameCard title="STATS" color="primary">
      <FlexParent>
        <FlexChild>
          <p>Name</p>
          <p>Encumbrance</p>
          <p>Strength</p>
          <p>Speed</p>
          <p>Gold</p>
        </FlexChild>
        <FlexChild>
          <p>{player.playerStatus.name}</p>
          <p>{player.playerStatus.encumbrance}</p>
          <p>{player.playerStatus.strength}</p>
          <p>{player.playerStatus.speed}</p>
          <p>{player.playerStatus.gold}</p>
        </FlexChild>
      </FlexParent>
    </GameCard>
  );
};
const mapDispatchToProps = {};
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInformation);
