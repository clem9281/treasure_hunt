import axios from "axios";

import { toast } from "react-toastify";

// configure toast
toast.configure({
  autoClose: 5000,
  draggable: false,
  closeOnClick: false
});

// create axios instance
const { REACT_APP_API_URL } = process.env;

const axiosConfig = {
  baseURL: REACT_APP_API_URL
};

export const requestWithAuth = authToken => {
  const instance = axios.create({
    ...axiosConfig,
    headers: { Authorization: `${authToken}` }
  });
  return instance;
};
