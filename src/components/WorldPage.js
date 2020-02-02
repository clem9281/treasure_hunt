import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";
import FullPageLoader from "./FullPageLoader";
import LinkToast from "./LinkToast";
import GameCard from "./GameCard";
import Map from "./Map";

import { loadMap, initializeRoom } from "../actions";
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
  min-height: 95vh;
`;

const StyledGridParent = styled(Grid)`
  min-height: 100vh;
`;

// beginning to change into hooks
const WorldPage = ({ mapDict, loadMap, initializeRoom, player }) => {
  const initialize = useCallback(async () => {
    let token = localStorage.getItem("token");
    try {
      await initializeRoom(token);
    } catch (error) {
      console.log(error);
    }
  }, [initializeRoom]);

  useEffect(() => {
    loadMap(map);
  }, [loadMap]);

  useEffect(() => {
    initialize();
  }, [initialize]);
  if (!mapDict || !player.currentRoom) {
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
              <GameCard color={teal[500]} title="STATS" />
            </Grid>
            <Grid item xs={12}>
              <GameCard color={green[500]} title="EQUIPMENT" />
            </Grid>
            <Grid item xs={12}>
              <GameCard color={deepPurple[500]} title="INVENTORY" />
            </Grid>
          </StyledGridChild>

          <StyledGridChild container item xs={7} spacing={3}>
            <Grid item xs={12}>
              <Map />
            </Grid>
          </StyledGridChild>
        </StyledGridParent>
      </Container>
    </main>
  );
};

const mapDispatchToProps = { loadMap, initializeRoom };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});
export default connect(mapStateToProps, mapDispatchToProps)(WorldPage);
