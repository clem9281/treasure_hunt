import React from "react";

import { connect } from "react-redux";

import { setWillPickUp } from "../actions";

import { Card, Checkbox, FormControlLabel } from "@material-ui/core";

const Controls = ({ title, color, player, setWillPickUp }) => {
  const handleChange = e => {
    setWillPickUp(e.target.checked);
  };
  return (
    <Card raised={false}>
      <FormControlLabel
        control={
          <Checkbox
            checked={player.willPickUp}
            onChange={handleChange}
            value="checkedB"
            color="primary"
          />
        }
        label="Check to pick up items as you walk"
      />
    </Card>
  );
};

const mapDispatchToProps = { setWillPickUp };
const mapStateToProps = ({ mapState, playerState }) => ({
  mapDict: mapState.rooms,
  dimension: mapState.dimension,
  gutter: mapState.gutter,
  player: playerState
});
export default connect(mapStateToProps, mapDispatchToProps)(Controls);
