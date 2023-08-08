//Include Both Helper File with needed methods
import { updateProfile } from "../../../helpers/backend_helper";

// action
import { profileError, profileSuccess, resetProfileFlagChange, startLoading } from "./reducer";

export const editProfile = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await updateProfile(credentials);
    let authData = JSON.parse(localStorage.getItem("authUser"));
    authData.user = response.data;
    localStorage.setItem("authUser", JSON.stringify(authData));
    dispatch(profileSuccess(response.message));
  } catch (error) {
    dispatch(profileError(error));
  }
};

export const resetProfileFlag = () => {
  try {
    const response = resetProfileFlagChange();
    return response;
  } catch (error) {
    return error;
  }
};
