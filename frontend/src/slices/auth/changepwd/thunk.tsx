import { userChangePasswordSuccess, userChangePasswordError, startLoading } from "./reducer";

import { postFakeChangePwd, postJwtChangePwd } from "../../../helpers/fakebackend_helper";

export const userChangePassword = (user) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log(user);
      dispatch(startLoading());
      response = postJwtChangePwd(user);
      console.log(response);
    } else {
      response = postFakeChangePwd(user);
    }

    const data = await response;

    if (data) {
      // dispatch(userChangePasswordSuccess(data));
      dispatch(userChangePasswordSuccess("Password changed successfully"));
    }
  } catch (changeError) {
    dispatch(userChangePasswordError(changeError));
  }
};
