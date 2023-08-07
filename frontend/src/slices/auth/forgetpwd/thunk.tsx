import { startLoading, userForgetPasswordError, userForgetPasswordSuccess } from "./reducer";

import { postJwtForgetPwd } from "../../../helpers/backend_helper";
import { postFakeForgetPwd } from "../../../helpers/fakebackend_helper";

export const userForgetPassword = (user) => async (dispatch) => {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      dispatch(startLoading());
      await postJwtForgetPwd(user);
    } else {
      await postFakeForgetPwd(user.email);
    }
    dispatch(userForgetPasswordSuccess("A reset link has been sent to your mailbox."));
  } catch (error) {
    dispatch(userForgetPasswordError(error));
  }
};
