import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";
import FullPageLoader from "./FullPageLoader";
import Map from "./Map";
import ActionArea from "./ActionArea";
import Controls from "./Controls";
import PlayerInfo from "./PlayerInfo";
import Inventory from "./Inventory";

import {
  GameCard,
  GridAncestor,
  GridParentChild,
  GridChild
} from "./styledComponents";

import { loadMap, initializeRoom, playerStatus } from "../actions";
import { connect } from "react-redux";

import map from "../util/map.json";

import { Container } from "@material-ui/core";

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
  }, [initializeRoom, playerStatus]);

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
        <GridAncestor justifyContent="space-between">
          <GridParentChild
            flexBasis="30%"
            flexDirection="column"
            flex="0 0 30%"
            justifyContent="space-between"
          >
            <GridChild>
              <PlayerInfo />
            </GridChild>
            <GridChild>
              <GameCard title="EQUIPMENT" color="success" />
            </GridChild>
            <GridChild>
              <Inventory />
            </GridChild>
          </GridParentChild>

          <GridParentChild
            flexBasis="68%"
            flexDirection="column"
            flex="0 0 68%"
          >
            <GridChild flex="0 0 50%">
              <Map />
            </GridChild>
            <GridChild flex="1 0 10%">
              <Controls />
            </GridChild>
            <GridChild flex="1 0 40%">
              <ActionArea />
            </GridChild>
          </GridParentChild>
        </GridAncestor>
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
