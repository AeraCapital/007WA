import {
  fetchKeywords,
  postAddKeyword,
  removeKeyword,
  updateKeyword,
} from "../../helpers/backend_helper.js";
import {
  addKeywordSuccessful,
  apiError,
  deleteKeywordSuccess,
  fetchError,
  fetchSuccess,
  startFetching,
  startLoading,
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
    dispatch(apiError(error));
  }
};

export const fetchKeywordsList = () => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = await fetchKeywords();
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export const editKeyword = (data, id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await updateKeyword(data, id);
    dispatch(updateKeywordSuccess(response.data));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const deleteKeyword = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await removeKeyword(id);
    console.log(response);
    dispatch(deleteKeywordSuccess(id));
  } catch (error) {
    dispatch(apiError(error));
  }
};
