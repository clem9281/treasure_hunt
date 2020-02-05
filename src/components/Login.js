import React, { useState } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";

import { ToastContainer } from "react-toastify";
import { handleFormErrors } from "../util";

import { requestWithAuth } from "../api";

import { StyledLink, useFormStyles } from "../styles";
const { REACT_APP_PROD_TOKEN } = process.env;

export default function Login(props) {
  const classes = useFormStyles();
  const [user, setUser] = useState({ username: "", password: "" });

  const loginUser = async () => {
    // localStorage.setItem(
    //   "token",
    //   `Token ${REACT_APP_PROD_TOKEN}`
    // );
    // props.history.push("/world");
    try {
      let res = await requestWithAuth().post(`api/login/`, user);
      const token = res.data.key;
      localStorage.setItem("token", `Token ${token}`);
      props.history.push("/world");
    } catch (err) {
      handleFormErrors(err);
    }
  };

  const handleChange = event => {
    event.persist();
    setUser(user => ({ ...user, [event.target.name]: event.target.value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    loginUser();
  };

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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={user.username}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <StyledLink to="/register">
                  {"Don't have an account? Sign Up"}
                </StyledLink>
              </Grid>
            </Grid>
            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
