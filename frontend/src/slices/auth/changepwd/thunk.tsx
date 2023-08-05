import { userChangePasswordSuccess, userChangePasswordError } from "./reducer";

import { postFakeChangePwd, postJwtChangePwd } from "../../../helpers/fakebackend_helper";

export const userChangePassword = (user) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log(user);
      response = postJwtChangePwd(user);
      console.log(response);
    } else {
      response = postFakeChangePwd(user);
    }

    const data = await response;

    if (data) {
      dispatch(userChangePasswordSuccess("A reset link has been sent to your mailbox."));
    }
  } catch (changeError) {
    dispatch(userChangePasswordError(changeError));
  }
};
