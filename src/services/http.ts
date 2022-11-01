import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

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

export { get };
