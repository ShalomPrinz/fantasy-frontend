import axios from "axios";

import { baseURL } from "../constants";
import { loadIdToken } from "./storage";

axios.defaults.baseURL = baseURL;

axios.interceptors.request.use((config) => {
  const idToken = loadIdToken();
  if (config.headers && process.env.REACT_APP_SESSION_HEADER && idToken)
    config.headers[process.env.REACT_APP_SESSION_HEADER] = idToken;
  return config;
});

axios.interceptors.response.use(undefined, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("An unexpected backend error occurred");
  }

  return Promise.reject(error);
});

const get = axios.get;
const post = axios.post;

export { get, post };
