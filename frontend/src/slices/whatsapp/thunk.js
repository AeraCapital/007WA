import { fetchContacts, fetchMessage, postCreateSession } from "../../helpers/backend_helper.js";
import {
  connectionError,
  connectionSuccess,
  getContactsSuccess,
  getMessagesSuccess,
} from "./reducer";
// import { messages } from "./mock-data-contacts.jsx";

export const createSession = (data) => async (dispatch) => {
  try {
    await postCreateSession(data);
    dispatch(connectionSuccess());
  } catch (error) {
    dispatch(connectionError(error));
  }
};

export const getContacts = () => async (dispatch) => {
  // dispatch(getContactsSuccess(contacts));
  try {
    let response = await fetchContacts();
    dispatch(getContactsSuccess(response.data));
  } catch (error) {
    dispatch(connectionError(error));
  }
};

export const getMessage = (id) => async (dispatch) => {
  // dispatch(getMessagesSuccess(messages));
  try {
    let response = await fetchMessage(id);
    dispatch(getMessagesSuccess(response.data));
  } catch (error) {
    dispatch(connectionError(error));
  }
};
