import axios from "axios";

// Set default base URL and content type
axios.defaults.baseURL = "https://sassy-apple-dev.dhoon.co";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Define common error messages
const errorMessages = {
  500: "Internal Server Error",
  401: "Invalid Credentials",
  404: "Sorry! The data you are looking for could not be found",
  400: "Something went wrong.",
  409: "Something went wrong.",
  default: "Something went wrong",
};

// Intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data || response;
  },
  function (error) {
    const statusCode = error.response?.data.statusCode;
    const message =
      error.response?.data.message ||
      errorMessages[statusCode] ||
      error.message ||
      errorMessages.default;
    return Promise.reject(message);
  }
);

// Sets the default authorization headers
const setAuthorization = () => {
  const root = JSON.parse(localStorage.getItem("persist:root"));
  const accessToken = JSON.parse(root.Login).accessToken;

  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

class APIClient {
  // Fetches data from given url
  get = (url, params) => {
    setAuthorization(); // Clear Authorization headers for unauthenticated requests
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      return axios.get(`${url}?${queryString}`);
    } else {
      return axios.get(url);
    }
  };

  // Post given data to url
  create = (url, data) => {
    setAuthorization();
    return axios.post(url, data);
  };

  // Updates data using HTTP PUT
  put = (url, data) => {
    setAuthorization();
    return axios.put(url, data);
  };

  // Deletes data at the specified URL
  delete = (url) => {
    setAuthorization();
    return axios.delete(url);
  };
}

export { APIClient, setAuthorization };
