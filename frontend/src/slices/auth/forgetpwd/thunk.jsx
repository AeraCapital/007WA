import { startLoading, userForgetPasswordError, userForgetPasswordSuccess } from "./reducer";

import { postJwtForgetPwd } from "../../../helpers/backend_helper";

export const userForgetPassword = (user) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await postJwtForgetPwd(user);
    dispatch(userForgetPasswordSuccess(response.message));
  } catch (error) {
    dispatch(userForgetPasswordError(error));
  }
};
