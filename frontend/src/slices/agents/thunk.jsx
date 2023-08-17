import {
  fetchAgents,
  postAddAgent,
  removeAgent,
  updateAgent,
} from "../../helpers/backend_helper.js";
import {
  addAgentFailed,
  addAgentSuccessful,
  apiError,
  deleteAgentSuccess,
  fetchError,
  fetchSuccess,
  startFetching,
  startLoading,
  updateAgentFailed,
  updateAgentSuccess,
} from "./reducer.jsx";

export const addAgent = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await postAddAgent(data);
    dispatch(addAgentSuccessful(response.data));
  } catch (error) {
    dispatch(addAgentFailed(error));
  }
};

export const fetchAgentsList = () => async (dispatch) => {
  try {
    dispatch(startFetching());
    const response = await fetchAgents();
    dispatch(fetchSuccess(response.data));
  } catch (error) {
    dispatch(fetchError(error));
  }
};

export const editAgent = (data, id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await updateAgent(data, id);
    dispatch(updateAgentSuccess(response.data));
  } catch (error) {
    dispatch(updateAgentFailed(error));
  }
};

export const deleteAgent = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await removeAgent(id);
    console.log(response);
    dispatch(deleteAgentSuccess(id));
  } catch (error) {
    dispatch(apiError(error));
  }
};
