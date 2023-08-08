//Include Both Helper File with needed methods
import { updateProfile } from "../../../helpers/backend_helper";
import { postFakeProfile } from "../../../helpers/fakebackend_helper";

// action
import { profileError, profileSuccess, resetProfileFlagChange, startLoading } from "./reducer";

export const editProfile = (credentials) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      dispatch(startLoading());
      response = updateProfile(credentials);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = postFakeProfile(credentials);
    }
    const data = await response;
    console.log("asdfkahsk");
    if (data) {
      const authData = JSON.parse(localStorage.getItem("authUser"));
      authData.user = data;
      localStorage.setItem("authUser", JSON.stringify(authData));
      dispatch(profileSuccess(data));
    }
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
