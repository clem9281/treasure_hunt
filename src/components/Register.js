import React, { useState } from "react";

import { TextField } from "@material-ui/core";

import { handleFormErrors } from "../util";

import { requestWithAuth } from "../api";

import { Form } from "./styledComponents";

export default function Register(props) {
  const [inputs, setInputs] = useState({
    password1: "",
    password2: "",
    username: ""
  });
  const registerUser = async () => {
    try {
      let res = await requestWithAuth().post(`api/registration/`, inputs);
      const token = res.data.key;
      localStorage.setItem("token", `Token ${token}`);
      props.history.push("/");
    } catch (err) {
      handleFormErrors(err);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    registerUser();
  };

  const handleChange = event => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value
    });
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
        value={inputs.username}
        onChange={handleChange}
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password1"
        label="Password"
        type="password"
        id="password"
        value={inputs.password1}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password2"
        label="Confirm Password"
        type="password"
        id="password2"
        value={inputs.password2}
        onChange={handleChange}
      />
    </Form>
  );
}
