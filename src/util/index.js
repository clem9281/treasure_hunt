import axios from "axios";

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
