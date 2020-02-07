import React from "react";
import { Menu as MUIMenu, MenuItem, IconButton } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { styled } from "@material-ui/styles";
import { withRouter } from "react-router-dom";

export const StyledIconButton = styled(IconButton)({
  position: "absolute",
  right: "2%",
  top: "90%",
  color: "white",
  "z-index": 999
});

const Menu = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = e => {
    localStorage.removeItem("token");
    props.history.push("/");
    handleClose();
  };

  return (
    <div>
      <StyledIconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon fontSize="large" />
      </StyledIconButton>
      <MUIMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MUIMenu>
    </div>
  );
};
export default withRouter(Menu);
