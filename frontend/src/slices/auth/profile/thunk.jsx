//Include Both Helper File with needed methods
import { postFakeProfile } from "../../../helpers/fakebackend_helper";
import { updateProfile } from "../../../helpers/backend_helper";

// action
import { profileError, profileSuccess, resetProfileFlagChange } from "./reducer";

export const editProfile = (credentials) => async (dispatch) => {
  try {
    let response;
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      // console.log("working till here");
      response = updateProfile(credentials);
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      response = postFakeProfile(credentials);
    }
    const data = await response;

    if (data) {
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
