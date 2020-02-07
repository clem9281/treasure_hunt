import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Link } from "react-router-dom";

import {
  Avatar,
  Button,
  Paper,
  Box,
  Grid,
  Typography
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";

import { ToastContainer } from "react-toastify";

const Form = ({ title, submitHandler, children }) => {
  const classes = useFormStyles();
  return (
    <Grid container component="main" className={classes.root}>
      <ToastContainer />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CodeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <form className={classes.form} onSubmit={submitHandler} noValidate>
            {children}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {title}
            </Button>
            <Grid container>
              <Grid item>
                {/* <StyledLink to="/register">
                  {"Don't have an account? Sign Up"}
                </StyledLink> */}
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
export default Form;

const StyledLink = styled(Link)`
  color: white;
  &:visited {
    color: white;
  }
`;

const useFormStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage:
      "url(https://images.pexels.com/photos/697662/pexels-photo-697662.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "right"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
