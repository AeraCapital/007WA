import { fetchAgentMessages, fetchAgentsContacts } from "../../helpers/backend_helper.js";
import { getAgentsSuccess, getAgentMessagesSuccess } from "./reducer";

export const getAgentswithContacts = () => async (dispatch) => {
  // dispatch(getContactsSuccess(contacts));
  try {
    let response = await fetchAgentsContacts();
    dispatch(getAgentsSuccess(response.data));
  } catch (error) {
    // dispatch(connectionError(error));
  }
};

export const getAgentMessages = (agentId, contactId) => async (dispatch) => {
  // dispatch(getContactsSuccess(contacts));
  try {
    let response = await fetchAgentMessages(agentId, contactId);
    dispatch(getAgentMessagesSuccess(response.data));
  } catch (error) {
    // dispatch(connectionError(error));
  }
};
