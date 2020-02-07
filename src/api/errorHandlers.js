import React from "react";
import { toast } from "react-toastify";
import LinkToast from "../components/LinkToast";

export const handleFormErrors = err => {
  if (err.response && err.response.data && err.response.status === 400) {
    for (let key of Object.keys(err.response.data)) {
      toast.error(`${key}: ${err.response.data[key]}`);
    }
  } else {
    console.log(err);
    toast.error(`Something went wrong`);
  }
};

export const handle401 = (err, history) => {
  if (err.response && err.response.status === 401) {
    toast.error(<LinkToast />);
    history.push("/login");
  } else {
    console.log(err);
    toast.error(`Something went wrong`);
  }
};
