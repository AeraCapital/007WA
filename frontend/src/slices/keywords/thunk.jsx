import { fetchKeywords, postAddKeyword, updateKeyword } from "../../helpers/backend_helper.js";
import {
  addKeywordFailed,
  addKeywordSuccessful,
  fetchKeywordsFailed,
  fetchKeywordsSuccessful,
  startLoading,
  updateKeywordFailed,
  updateKeywordSuccess,
} from "./reducer.jsx";

export const addKeyword = (data) => async (dispatch) => {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log("Adding Keyword", data);
      dispatch(startLoading()); // Dispatch the addKeywordPending action before the API call
      const response = await postAddKeyword(data);
      console.log(response);
      dispatch(addKeywordSuccessful(response));
    } else {
      console.log("Todo");
    }
  } catch (error) {
    console.log("Error from Keyword", error);
    dispatch(addKeywordFailed(error));
  }
};

export const fetchKeywordsList = () => async (dispatch) => {
  try {
    console.log("Fetching Keywords");
    dispatch(startLoading());
    const response = await fetchKeywords(); // Assuming this function handles the API call to fetch keywords
    console.log(response);
    dispatch(fetchKeywordsSuccessful(response));
  } catch (error) {
    dispatch(fetchKeywordsFailed(error));
  }
};

export const editKeyword = (data, id) => async (dispatch) => {
  try {
    console.log("Editing Keyword");
    dispatch(startLoading());
    const response = await updateKeyword(data, id);
    console.log(response);
    dispatch(updateKeywordSuccess(response));
  } catch (error) {
    dispatch(updateKeywordFailed(error));
  }
};
