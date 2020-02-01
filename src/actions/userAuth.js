import { requestWithAuth } from "../util";

import { toast } from "react-toastify";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const login = (user, history) => {
  return async dispatch => {
    dispatch({ type: LOGIN_START });
    return requestWithAuth()
      .post(`api/login/`, user)
      .then(res => {
        if (res.status === 200 && res.data) {
          dispatch({ type: LOGIN_SUCCESS });
          const token = res.data.key;
          localStorage.setItem("token", `Token ${token}`);
          history.push("/world");
        }
      })
      .catch(err => {
        if (err.response.data) {
          for (let key of Object.keys(err.response.data)) {
            toast.error(`${key}: ${err.response.data[key]}`);
          }
        } else {
          console.log(err);
          toast.error(`Something went wrong`);
        }
      });
  };
};
