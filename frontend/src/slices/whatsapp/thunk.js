import {
  fetchContacts,
  fetchMessage,
  postCreateSession,
  postMessage,
} from "../../helpers/backend_helper.js";
import {
  CONNECTION_STATE,
  addContact,
  addFetchedMessage,
  addNewMessageCount,
  connectionError,
  getContactsSuccess,
  getMessagesSuccess,
  sendMessageSuccess,
  storeFetchedMessages,
  udpateWhatsAppState,
} from "./reducer";
// import { messages } from "./mock-data-contacts.jsx";

export const createSession = () => async (dispatch) => {
  try {
    await postCreateSession();
    console.log("Create Session Success");
    dispatch(udpateWhatsAppState(CONNECTION_STATE.WAITING_QR));
  } catch (error) {
    dispatch(connectionError(error));
  }
};

export const getContacts = () => async (dispatch) => {
  // dispatch(getContactsSuccess(contacts));
  try {
    let response = await fetchContacts();
    const responseWithMessageCount = response.data.map((contact) => ({
      ...contact,
      newMessageCount: 0,
    }));
    dispatch(getContactsSuccess(responseWithMessageCount));
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

  //if id is not there in contacts list
  const idSet = new Set(contacts.map((item) => item.id));
  if (!idSet.has(data.client.id)) {
    dispatch(
      addContact({
        id: data.client.id,
        phone: data.client.phone,
        name: data.client.name,
        newMessageCount: 1, //got a new message
      })
    );
  } else {
    dispatch(addNewMessageCount(data.client));
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
