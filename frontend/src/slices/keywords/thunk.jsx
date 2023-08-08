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
    console.log("Adding Keyword", data);
    dispatch(startLoading());
    const response = await postAddKeyword(data);
    console.log(response);
    dispatch(addKeywordSuccessful(response.data));
  } catch (error) {
    dispatch(addKeywordFailed(error));
  }
};

export const fetchKeywordsList = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await fetchKeywords();
    dispatch(fetchKeywordsSuccessful(response.data));
  } catch (error) {
    dispatch(fetchKeywordsFailed(error));
  }
};

export const editKeyword = (data, id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await updateKeyword(data, id);
    dispatch(updateKeywordSuccess(response.data));
  } catch (error) {
    dispatch(updateKeywordFailed(error));
  }
};
