import React, { useEffect, useCallback } from "react";

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

import map from "../util/prodMap/map.json";
import d3Data from "../util/prodMap/d3Data.json";
import links from "../util/prodMap/links.json";

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
    loadMap(map, d3Data, links);
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
        {/* <GridAncestor justifyContent="space-between" alignItemes="center"> */}
        <GridParentChild
          width="30%"
          flexDirection="column"
          flex="0 1 30%"
          justifyContent="space-between"
          alignContent="stretch"
        >
          <GridChild flex="0 1 30%" height="30%">
            <PlayerInfo />
          </GridChild>
          <GridChild flex="0 1 30%" height="30%">
            <GameCard title="EQUIPMENT" color="success" />
          </GridChild>
          <GridChild flex="0 1 30%" height="30%">
            <Inventory />
          </GridChild>
        </GridParentChild>

        <GridParentChild
          width="60%"
          flexDirection="column"
          flex="0 1 60%"
          justifyContent="stretch"
        >
          <GridChild flex="0 0 50%" height="400px">
            <Map />
          </GridChild>
          <GridChild flex="1 0 10%">
            <Controls />
          </GridChild>
          <GridChild flex="1 0 40%">
            <ActionArea />
          </GridChild>
        </GridParentChild>
        {/* </GridAncestor> */}
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
