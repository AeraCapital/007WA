import { postResetPwd } from "../../../helpers/backend_helper";
import { startLoading, userResetPasswordError, userResetPasswordSuccess } from "./reducer";

export const userResetPassword = (user, userId, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await postResetPwd(user, userId);
    dispatch(userResetPasswordSuccess(response.message));
    history("/reset-password-success");
  } catch (resetError) {
    dispatch(userResetPasswordError(resetError));
  }
};
