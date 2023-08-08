import { postResetPwd } from "../../../helpers/fakebackend_helper";
import { startLoading, userResetPasswordError, userResetPasswordSuccess } from "./reducer";

export const userResetPassword = (user, userId) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await postResetPwd(user, userId);
    dispatch(userResetPasswordSuccess("Password Reset Successfully."));
  } catch (resetError) {
    dispatch(userResetPasswordError(resetError));
  }
};
