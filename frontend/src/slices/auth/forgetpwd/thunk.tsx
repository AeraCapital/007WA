import { userForgetPasswordSuccess, userForgetPasswordError } from "./reducer";

import { postFakeForgetPwd, postJwtForgetPwd } from "../../../helpers/fakebackend_helper";

export const userForgetPassword = (user) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log(user);
      response = postJwtForgetPwd(user);
      console.log(response);
    } else {
      response = postFakeForgetPwd(user.email);
    }

    const data = await response;

    if (data) {
      dispatch(userForgetPasswordSuccess("A reset link has been sent to your mailbox."));
    }
  } catch (forgetError) {
    dispatch(userForgetPasswordError(forgetError));
  }
};
