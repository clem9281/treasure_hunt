import React, { useState } from "react";

import { Form } from "./styledComponents";
import { TextField } from "@material-ui/core";
// import { handleFormErrors } from "../util";

// import { requestWithAuth } from "../api";

const { REACT_APP_PROD_TOKEN } = process.env;

export default function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const loginUser = async () => {
    localStorage.setItem("token", `Token ${REACT_APP_PROD_TOKEN}`);
    props.history.push("/world");
    // try {
    //   let res = await requestWithAuth().post(`api/login/`, user);
    //   const token = res.data.key;
    //   localStorage.setItem("token", `Token ${token}`);
    //   props.history.push("/world");
    // } catch (err) {
    //   handleFormErrors(err);
    // }
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
    <Form title="Sign In" submitHandler={handleSubmit}>
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
    </Form>
  );
}
