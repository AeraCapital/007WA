import { userResetPasswordSuccess, userResetPasswordError } from "./reducer";

import { postJwtResetPwd } from "../../../helpers/fakebackend_helper";

export const userResetPassword = (user, userId) => async (dispatch) => {
  try {
    let response;
    console.log(user);
    response = postJwtResetPwd(user, userId);
    console.log(response);

    const data = await response;

    if (data) {
      dispatch(userResetPasswordSuccess("Password Reset Successfully."));
    }
  } catch (resetError) {
    dispatch(userResetPasswordError(resetError));
  }
};
