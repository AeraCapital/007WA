import { postFakeLogin, postJwtLogin } from "helpers/fakebackend_helper";
import {
  loginError,
  loginSuccess,
  logoutUserSuccess,
  resetLoginFlag,
  startLoading,
} from "./reducer";

export const loginUser = (credentials, history) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      dispatch(startLoading());
      response = await postJwtLogin(credentials);
      localStorage.setItem("authUser", JSON.stringify(response.data));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      console.log("Login From Fake Server");
      response = await postFakeLogin(credentials);
      localStorage.setItem("authUser", JSON.stringify(response));
    }
    dispatch(loginSuccess(response));
    history("/dashboard");
  } catch (error) {
    console.log(error);
    console.log("Error here!");
    dispatch(loginError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("authUser");
  dispatch(logoutUserSuccess(true));
};

export const resetLoginMsgFlag = () => {
  try {
    const response = resetLoginFlag();
    return response;
  } catch (error) {
    return error;
  }
};
