import { postJwtLogin } from "helpers/backend_helper";
import { loginError, loginSuccess, logoutUserSuccess, startLoading } from "./reducer";

export const loginUser = (credentials, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await postJwtLogin(credentials);
    console.log("Login Response:", response);
    if (response.data) {
      localStorage.setItem("authUser", JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));
      history("/");
    } else {
      dispatch(loginError("Something went wrong. Try again later"));
    }
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
