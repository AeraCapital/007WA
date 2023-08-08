import { postAddAgent, fetchAgents, updateAgent } from "../../helpers/backend_helper.js";
import {
  addAgentSuccessful,
  addAgentFailed,
  fetchAgentsSuccessful,
  fetchAgentsFailed,
  startLoading,
  updateAgentFailed,
  updateAgentSuccess,
} from "./reducer.jsx";

export const addAgent = (data) => async (dispatch) => {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      console.log("Adding Agent", data);
      dispatch(startLoading()); // Dispatch the addAgentPending action before the API call
      const response = await postAddAgent(data);
      console.log(response);
      dispatch(addAgentSuccessful(response));
    } else {
      console.log("Todo");
    }
  } catch (error) {
    console.log("Error from Agent", error);
    dispatch(addAgentFailed(error));
  }
};

export const fetchAgentsList = () => async (dispatch) => {
  try {
    console.log("Fetching Agents");
    dispatch(startLoading());
    const response = await fetchAgents(); // Assuming this function handles the API call to fetch agents
    console.log(response);
    dispatch(fetchAgentsSuccessful(response));
  } catch (error) {
    dispatch(fetchAgentsFailed(error));
  }
};

export const editAgent = (data, id) => async (dispatch) => {
  try {
    console.log("Editing Agent");
    dispatch(startLoading());
    const response = await updateAgent(data, id);
    dispatch(updateAgentSuccess(response));
  } catch (error) {
    dispatch(updateAgentFailed(error));
  }
};
