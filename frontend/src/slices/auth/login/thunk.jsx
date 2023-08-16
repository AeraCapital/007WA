import { postJwtLogin } from "helpers/backend_helper";
import { loginError, loginSuccess, logoutUserSuccess, startLoading } from "./reducer";

export const loginUser = (credentials, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await postJwtLogin(credentials);

    console.log("Login Response:", response);

    if (response.data) {
      dispatch(loginSuccess(response.data));
      history("/");
    } else {
      dispatch(loginError("Something went wrong. Try again later"));
    }
  } catch (error) {
    console.log("Login Error:", error);
    dispatch(loginError(error));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(logoutUserSuccess());
};
