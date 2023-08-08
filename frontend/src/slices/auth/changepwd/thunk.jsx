import { userChangePasswordSuccess, userChangePasswordError, startLoading } from "./reducer";

import { postJwtChangePwd } from "../../../helpers/backend_helper";

export const userChangePassword = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await postJwtChangePwd(credentials);
    dispatch(userChangePasswordSuccess(response.message));
  } catch (changeError) {
    dispatch(userChangePasswordError(changeError));
  }
};
