import React from "react";
import { connect } from "react-redux";

import { GameCard } from "./styledComponents";

const ActionArea = ({ title, color, player }) => {
  return (
    <GameCard title={player.currentRoom.title.toUpperCase()} color="info">
      {player.currentRoom.description}
    </GameCard>
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
