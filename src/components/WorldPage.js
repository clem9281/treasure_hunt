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
const StyledGridColumn = styled(StyledGridChild)`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  grid-template-rows: repeat(12, minmax(0, 1fr));
  padding: 8rem;
`;

const StyledGridInnerChild = styled.div`
  // height: ${props => (props.bottom ? "200px" : props.top ? "100%" : "")};
  grid-column: ${props => props.column};
  grid-row: ${props => props.row};
  padding: .7rem;
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

          <StyledGridColumn item xs={7}>
            <StyledGridInnerChild top row="1/8" column="1/13" item xs={12}>
              <Map />
            </StyledGridInnerChild>
            <StyledGridInnerChild bottom row="8/13" column="1/13" item xs={12}>
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

const mapDispatchToProps = { loadMap, initializeRoom };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});
export default connect(mapStateToProps, mapDispatchToProps)(WorldPage);
