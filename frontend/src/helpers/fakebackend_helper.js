import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("authUser");
  if (user) return JSON.parse(user);
  return null;
};

// Register Method
export const postFakeRegister = (data) => {
  return api.create(url.POST_FAKE_REGISTER, data).catch((err) => {
    let message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message = "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postFakeLogin = (data) => api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data) => api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// postForgetPwd
export const postFakeChangePwd = (data) => api.create(url.POST_FAKE_PASSWORD_CHANGE, data);

// Edit profile
export const postFakeProfile = (data) => api.create(url.POST_EDIT_PROFILE, data);

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_JWT_LOGIN, data);

// postResetPwd
export const postResetPwd = (data, id) => api.create(url.POST_JWT_PASSWORD_RESET + id, data);

// postResetPwd
export const postJwtChangePwd = (data) => {
  return api.create(url.POST_JWT_PASSWORD_CHANGE, data);
};

// api.get Messages
export const getMessages = (roomId) =>
  api.get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// add Message
export const addMessage = (message) => api.create(url.ADD_MESSAGE, message);

export const getContacts = () => api.get(url.GET_CONTACTS, null);

// // get groups
export const getGroups = () => api.get(url.GET_GROUPS, null);

// get chats
export const getChats = () => api.get(url.GET_CHATS, null);
