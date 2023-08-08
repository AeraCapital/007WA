import axios from "axios";

// default
axios.defaults.baseURL = "https://sassy-apple-dev.dhoon.co"; // "http://localhost:3002"; //"http://13.126.89.32:3002/";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// content type
// let authUser = (localStorage.getItem("authUser"));

// intercepting to capture errors
axios.interceptors.response.use(
  function (response) {
    return response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;
    console.log("From Interceptior", error);
    switch (error.response?.data.statusCode) {
      case 500:
        message = error.response.data.message || "Internal Server Error";
        break;
      case 401:
        message = error.response.data.message || "Invalid Credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      case 400:
        message = error.response.data.message[0] || "Something went wrong.";
        break;
      case 409:
        message = error.response.data.message || "Something went wrong.";
        break;
      default:
        message = error.response.data.message || error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = () => {
  const jwtToken = getLoggedinUser()?.access_token;
  if (jwtToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    setAuthorization();

    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString = paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response.then((object) => object.data);
  };
  /**
   * post given data to url
   */
  create = (url, data) => {
    setAuthorization();
    return axios.post(url, data);
  };
  /**
   * Updates data
   */
  // update = (url, data) => {
  //   return axios.patch(url, data).then((object) => object.data);
  // };

  put = (url, data) => {
    setAuthorization();
    return axios.put(url, data).then((object) => object.data);
  };

  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };
}

const getLoggedinUser = () => {
  const user = localStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, getLoggedinUser, setAuthorization };
