import { APIClient } from "./api_helper";
import * as url from "./url_helper";

const api = new APIClient();

// Register Method
export const postJwtRegister = (data) => api.create(url.POST_JWT_REGISTER, data);

// Login Method
export const postJwtLogin = (data) => api.create(url.POST_JWT_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data) => api.create(url.POST_JWT_PASSWORD_FORGET, data);

// postResetPwd
export const postJwtResetPwd = (data, id) => api.create(url.POST_JWT_PASSWORD_RESET + id, data);

// getKeywords
export const fetchKeywords = () => api.get(url.GET_KEYWORDS, null);

// addKeywords
export const postAddKeyword = (data) => api.create(url.ADD_KEYWORD, data);

// updateProfile
export const updateProfile = (data) => api.put(url.PUT_UPDATE_PROFILE, data);
