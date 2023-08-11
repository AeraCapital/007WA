import {
  fetchContacts,
  fetchMessage,
  postCreateSession,
  postMessage,
} from "../../helpers/backend_helper.js";
import {
  connectionError,
  connectionSuccess,
  getContactsSuccess,
  getMessagesSuccess,
  sendMessageSuccess,
  storeFetchedMessages,
  addFetchedMessage,
  addContact,
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

export const getMessage = (id) => async (dispatch, getState) => {
  const state = getState();
  const fetchedMessages = state.Whatsapp.fetchedMessages;

  if (fetchedMessages[id]) {
    dispatch(getMessagesSuccess(fetchedMessages[id]));
    return; // Messages are already fetched, no need to make API call
  }

  try {
    let response = await fetchMessage(id);
    dispatch(getMessagesSuccess(response.data));
    console.log(response.data);
    dispatch(storeFetchedMessages({ contactId: id, messages: response.data }));
  } catch (error) {
    dispatch(connectionError(error));
  }
};

export const sendMessage = (data) => async (dispatch) => {
  // dispatch(getMessagesSuccess(messages));
  try {
    await postMessage(data);
    dispatch(sendMessageSuccess());
  } catch (error) {
    dispatch(connectionError(error));
  }
};

export const handleSocketMessage = (data) => async (dispatch, getState) => {
  console.log(data);
  const state = getState();
  const fetchedMessages = state.Whatsapp.fetchedMessages;
  const contacts = state.Whatsapp.contacts;

  const idSet = new Set(contacts.map((item) => item.id));
  if (!idSet.has(data.client.id)) {
    console.log("new contacts", data.client.id);
    console.log(contacts);
    dispatch(addContact({ id: data.client.id, phone: data.client.phone, name: data.client.name }));
  } else {
    console.log("Existing contact");
  }

  if (fetchedMessages[data.client.id]) {
    dispatch(
      addFetchedMessage({
        contactId: data.client.id,
        message: {
          id: data.id,
          body: data.body,
          type: data.type,
          messageTimestamp: data.messageTimestamp,
        },
      })
    );
  }
};
