import { postCreateSession } from "../../helpers/backend_helper.js";
import { connectionError, connectionSuccess, startLoading } from "./reducer";

export const createSession = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    await postCreateSession(data);
    console.log("Session created");
    dispatch(connectionSuccess());
  } catch (error) {
    dispatch(connectionError(error));
  }
};
