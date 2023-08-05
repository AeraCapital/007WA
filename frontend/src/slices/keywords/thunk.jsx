import { postAddKeyword, fetchKeywords } from "../../helpers/backend_helper.js";
import {
  addKeywordPending, // Add the new action here
  addKeywordSuccessful,
  addKeywordFailed,
  fetchKeywordsPending,
  fetchKeywordsSuccessful,
  fetchKeywordsFailed,
} from "./reducer.jsx";

export const addKeyword = (data) => async (dispatch) => {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log("Adding Keyword", data);
      dispatch(addKeywordPending()); // Dispatch the addKeywordPending action before the API call
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
    dispatch(fetchKeywordsPending());
    const response = await fetchKeywords(); // Assuming this function handles the API call to fetch keywords
    console.log(response);
    dispatch(fetchKeywordsSuccessful(response));
  } catch (error) {
    dispatch(fetchKeywordsFailed(error));
  }
};
