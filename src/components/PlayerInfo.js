import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  Grid,
  Card,
  Paper,
  CardHeader,
  CardContent,
  Container
} from "@material-ui/core";
import {
  teal,
  blue,
  deepPurple,
  green,
  yellow,
  red
} from "@material-ui/core/colors";

const FlexParent = styled.div`
  display: flex;
`;

const FlexChild = styled.div`
  width: 50%;
`;

const PlayerInformation = ({ player }) => {
  console.log(player);
  return (
    <FlexParent>
      <FlexChild>
        <p>Name</p>
        <p>Encumbrance</p>
        <p>Strength</p>
        <p>Speed</p>
        <p>Gold</p>
        <p>Inventory</p>
      </FlexChild>
      <FlexChild>
        <p>{player.playerStatus.name}</p>
        <p>{player.playerStatus.encumbrance}</p>
        <p>{player.playerStatus.strength}</p>
        <p>{player.playerStatus.speed}</p>
        <p>{player.playerStatus.gold}</p>
        <p>
          {player.playerStatus.inventory.length < 0
            ? player.playerStatus.inventory.join(",")
            : "None"}
        </p>
      </FlexChild>
    </FlexParent>
  );
};
const mapDispatchToProps = {};
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInformation);
