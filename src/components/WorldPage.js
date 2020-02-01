import React, { useState, useEffect, useCallback } from "react";

import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Menu from "./Menu";

import FullPageLoader from "./FullPageLoader";
import LinkToast from "./LinkToast";
import GameCard from "./GameCard";
import Map from "./Map";

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

import { usePositionFinder } from "../hooks";

const StyledGridChild = styled(Grid)`
  min-height: 95vh;
`;

const GameArea = styled(Paper)`
  height: 60%;
  box-shadow: none;
  padding: 0;
  border: 3px solid ${yellow[700]};
  overflow: hidden;
`;
const StyledGridParent = styled(Grid)`
  min-height: 100vh;
`;

// beginning to change into hooks
export default function WorldPage() {
  //   const randomPlayerColor = () => {
  //     const colors = [
  //       "#7f0000",
  //       "#4a148c",
  //       "#0d47a1",
  //       "#e65100",
  //       "#004d40",
  //       "#1565c0"
  //     ];
  //     const random = Math.floor(Math.random() * (colors.length - 1));
  //     setPlayerColor(colors[random]);
  //   };

  //   if (!roomIndex || !player) {
  //     return (
  //       <>
  //         <ToastContainer />
  //         <FullPageLoader />
  //       </>
  //     );
  //   }
  let player = { room: { x: 16, y: 13 } };
  let center = usePositionFinder(player, 20, "#game-area");
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
              <GameArea id="game-area">
                <Map center={center} dimension={45} gutter={10} />
              </GameArea>
            </Grid>
          </StyledGridChild>
        </StyledGridParent>
      </Container>
    </main>
  );
}
