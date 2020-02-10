import React, { useState } from "react";

import { Form } from "./styledComponents";
import { TextField } from "@material-ui/core";
// import { handleFormErrors } from "../api";

// import { requestWithAuth } from "../api";

// ****************************************************************
// THE COMMENTED CODE IS LEFT IN FOR USING WITH THE TEST SERVER!!!
// ****************************************************************

export default function Login(props) {
  const [user, setUser] = useState({ token: "", password: "" });
  const loginUser = async () => {
    localStorage.setItem("token", `Token ${user.token}`);
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
        id="token"
        label="Enter Your Api Token"
        name="token"
        autoComplete="token"
        value={user.token}
        onChange={handleChange}
        autoFocus
      />
      {/* <TextField
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
      /> */}
    </Form>
  );
}
