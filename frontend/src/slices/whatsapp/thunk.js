import { postCreateSession } from "../../helpers/backend_helper.js";
import { startLoading, connectionSuccess } from "./reducer";

export const connectWhatsapp = (data) => async (dispatch) => {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      dispatch(startLoading()); // Dispatch the addKeywordPending action before the API call
      let response = await postCreateSession(data);
      console.log("here", response);
      dispatch(connectionSuccess());
    } else {
      console.log("Todo");
    }
  } catch (error) {
    console.log("Error from Keyword", error);
    // dispatch(addKeywordFailed(error));
  }
};
