import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

// Register Method
export const postJwtRegister = (data) => api.create(url.POST_JWT_REGISTER, data);

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) => api.create(url.POST_JWT_PASSWORD_FORGET, data);

export const postJwtChangePwd = (data) => {
  return api.create(url.POST_JWT_PASSWORD_CHANGE, data);
};

// postResetPwd
export const postResetPwd = (data, id) => api.create(url.POST_JWT_PASSWORD_RESET + id, data);

// postResetPwd
export const postJwtResetPwd = (data, id) => api.create(url.POST_JWT_PASSWORD_RESET + id, data);

// updateProfile
export const updateProfile = (data) => api.put(url.PUT_UPDATE_PROFILE, data);

// Keywords
export const fetchKeywords = () => api.get(url.GET_KEYWORDS, null);
export const postAddKeyword = (data) => api.create(url.ADD_KEYWORD, data);
export const updateKeyword = (data, id) => api.put(url.UPDATE_KEYWORD + id, data);

// Agents
export const fetchAgents = () => api.get(url.GET_AGENTS, null);
export const postAddAgent = (data) => api.create(url.ADD_AGENT, data);
export const updateAgent = (data, id) => api.put(url.UPDATE_AGENT + id, data);

//Chats
export const postCreateSession = (data) => api.create(url.CREATE_SESSION, data);
export const fetchContacts = () => api.get(url.GET_CONTACTS, null);
export const fetchMessage = (id) => api.get(url.GET_MESSAGE + id, null);
