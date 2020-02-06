import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Paper, LinearProgress } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
const Cooldown = ({ player }) => {
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    setCompleted(0);
    function progress() {
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff =
          (100 - player.currentRoom.cooldown) / player.currentRoom.cooldown;
        return oldCompleted + diff;
      });
    }
    let timer;
    if (player.isCoolingDown) {
      timer = setInterval(progress, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [player.currentRoom, player.currentRoom.room_id, player.isCoolingDown]);
  if (player.isCoolingDown) {
    return (
      <StyledCooldown>
        <StyledProgress
          color="primary"
          variant="determinate"
          value={completed}
        />
        <StyledCooldownText>Cooling Down</StyledCooldownText>
      </StyledCooldown>
    );
  } else if (player.calculating) {
    return (
      <StyledCooldown>
        <StyledProgress color="primary" />
        <StyledCooldownText>
          Calculating Route to Destination
        </StyledCooldownText>
      </StyledCooldown>
    );
  } else if (player.hasCoolDownError) {
  } else {
    return <></>;
  }
};

const mapDispatchToProps = {};
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  player: playerState
});

export default connect(mapStateToProps, mapDispatchToProps)(Cooldown);

export const StyledCooldown = styled(Paper)`
  z-index: 1000;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  background: ${yellow[700]};
  border-radius: 0px;
  color: black;
  padding: 0;
`;

export const StyledCooldownText = styled.p`
  text-align: center;
  font-weight: bold;
  color: black;
  padding: 0;
  font-size: 1.2rem;
`;

export const StyledProgress = styled(LinearProgress)`
  height: 10px;
`;
