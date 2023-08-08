import { postJwtRegister } from "../../../helpers/backend_helper.js";
import { registerFailed, registerSuccess, startLoading } from "./reducer.jsx";

export const registerUser = (user, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await postJwtRegister(user);
    console.log("Signup Response format needs to be updated:", response);
    dispatch(registerSuccess(response));
    history("/login");
  } catch (error) {
    dispatch(registerFailed(error));
  }
};
