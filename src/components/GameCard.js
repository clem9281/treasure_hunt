import React from "react";
import styled from "styled-components";
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

const GameCard = ({ title, color, children }) => {
  return (
    <StyledCard border={color}>
      <StyledCardHeader color={color} title={title}></StyledCardHeader>
      <CardContent>{children}</CardContent>
    </StyledCard>
  );
};

export default GameCard;
