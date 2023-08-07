import { postJwtRegister } from "../../../helpers/backend_helper.js";
import { postFakeRegister } from "../../../helpers/fakebackend_helper.js";
import { registerFailed, registerSuccess, startLoading } from "./reducer.jsx";

export const registerUser = (user) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      dispatch(startLoading());
      response = await postJwtRegister(user);
    } else {
      response = await postFakeRegister(user);
    }
    console.log("asdkjfhaskd", response);
    dispatch(registerSuccess("response"));
  } catch (error) {
    dispatch(registerFailed(error));
  }
};
