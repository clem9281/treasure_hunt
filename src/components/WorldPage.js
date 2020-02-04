import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";
import FullPageLoader from "./FullPageLoader";
import LinkToast from "./LinkToast";
import GameCard from "./GameCard";
import Map from "./Map";
import ActionArea from "./ActionArea";
import Controls from "./Controls";
import PlayerInfo from "./PlayerInfo";

import { loadMap, initializeRoom, playerStatus } from "../actions";
import { connect } from "react-redux";

import map from "../util/map.json";
import { requestWithAuth } from "../util";

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
import playerReducer from "../reducers/playerReducer";

const StyledGridChild = styled(Grid)`
  height: 100%;
  min-height: 95vh;
`;

const StyledGridParent = styled(Grid)`
  height: 100%;
  min-height: 100vh;
`;
const StyledGridColumn = styled(StyledGridChild)`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));
  padding: 8rem;
`;

const StyledGridInnerChild = styled.div`
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  padding: 0.7rem;
`;
// beginning to change into hooks
const WorldPage = ({
  mapDict,
  loadMap,
  initializeRoom,
  player,
  playerStatus
}) => {
  const initialize = useCallback(async () => {
    let token = localStorage.getItem("token");
    try {
      await playerStatus(token);
      await initializeRoom(token);
    } catch (error) {
      console.log(error);
    }
  }, [initializeRoom]);

  // load map into state
  useEffect(() => {
    loadMap(map);
  }, [loadMap]);
  // get player current room and player current status
  useEffect(() => {
    initialize();
  }, [initialize]);
  if (!mapDict || !player.currentRoom || !player.playerStatus) {
    return (
      <>
        <ToastContainer />
        <FullPageLoader />
      </>
    );
  }
  return (
    <main>
      <Menu></Menu>
      <ToastContainer />

      <Container maxWidth="xl">
        <StyledGridParent
          container
          spacing={3}
          alignItems="center"
          justify="center"
        >
          <StyledGridChild container item xs={4} spacing={3}>
            <Grid item xs={12}>
              <GameCard color={teal[500]} title="STATS">
                <PlayerInfo />
              </GameCard>
            </Grid>
            <Grid item xs={12}>
              <GameCard color={green[500]} title="EQUIPMENT" />
            </Grid>
            <Grid item xs={12}>
              <GameCard color={deepPurple[500]} title="INVENTORY" />
            </Grid>
          </StyledGridChild>

          <StyledGridColumn item xs={7}>
            <StyledGridInnerChild row="1/7" column="1/13" item xs={12}>
              <Map />
            </StyledGridInnerChild>
            <StyledGridInnerChild row="7/8" column="1/13" item xs={12}>
              <Controls />
            </StyledGridInnerChild>
            <StyledGridInnerChild row="8/13" column="1/13" item xs={12}>
              <ActionArea
                title={player.currentRoom.title.toUpperCase()}
                color={blue[900]}
              />
            </StyledGridInnerChild>
          </StyledGridColumn>
        </StyledGridParent>
      </Container>
    </main>
  );
};

const mapDispatchToProps = { loadMap, initializeRoom, playerStatus };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});
export default connect(mapStateToProps, mapDispatchToProps)(WorldPage);
