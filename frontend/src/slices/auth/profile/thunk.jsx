//Include Both Helper File with needed methods
import { updateProfile } from "../../../helpers/backend_helper";
import { updateUser } from "../login/reducer";

// action
import { profileError, profileSuccess, resetProfileFlagChange, startLoading } from "./reducer";

export const editProfile = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());
    let response = await updateProfile(credentials);
    dispatch(updateUser(response.data));
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
