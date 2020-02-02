import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import {} from "../actions";

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
  red,
  grey
} from "@material-ui/core/colors";

const StyledCard = styled(Card)`
  box-shadow: none;
  height: 100%;
  position: relative;
  padding: 0;
  ${props => `border: 4px solid ${props.border}`};
`;

const StyledCardHeader = styled(CardHeader)`
  ${props => `background-color: ${props.color}`};
  width: max-content;
  margin: 0;
  padding: 0.5rem;
`;

const StyledCardContent = styled(CardContent)`
  margin: 1rem;
  display: flex;
  align-items: center;
  height: 80px;
  overflow: auto;
  background: ${grey[900]};
`;

const ActionArea = ({ title, color, player }) => {
  return (
    <StyledCard border={color}>
      <StyledCardHeader color={color} title={title}></StyledCardHeader>
      <StyledCardContent>{player.currentRoom.description}</StyledCardContent>
    </StyledCard>
  );
};

const mapDispatchToProps = {};
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  dimension: mapState.dimension,
  gutter: mapState.gutter,
  player: playerState
});
export default connect(mapStateToProps, mapDispatchToProps)(ActionArea);
