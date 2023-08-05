import { getFirebaseBackend } from "helpers/firebase_helper";
import { postFakeLogin, postJwtLogin } from "helpers/fakebackend_helper";
import { loginSuccess, apiError, logoutUserSuccess, resetLoginFlag } from "./reducer";

export const loginuser = (credentials, history) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log("Login From JWT");
      response = await postJwtLogin(credentials);
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      console.log("Login From Fake Server");
      response = await postFakeLogin(credentials);
      localStorage.setItem("authUser", JSON.stringify(response));
      dispatch(loginSuccess(response));
    }
    history("/dashboard");
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("authUser");
    const fireBaseBackend = getFirebaseBackend();
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = fireBaseBackend.logout;
      dispatch(logoutUserSuccess(response));
    } else {
      dispatch(logoutUserSuccess(true));
    }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginMsgFlag = () => {
  try {
    const response = resetLoginFlag();
    return response;
  } catch (error) {
    return error;
  }
};
