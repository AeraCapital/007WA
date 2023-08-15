import { createSlice } from "@reduxjs/toolkit";

export const CONNECTION_STATE = {
  CONNECTED: "CONNECTED",
  DISCONNECTED: "DISCONNECTED",
  WAITING_QR: "WAITING_QR",
  SCAN_QR: "SCAN_QR",
};

const initialState = {
  loading: false,
  error: null,
  success: null,
  activeContact: null,
  contacts: [],
  messages: [],
  fetchedMessages: {},
  whatsAppState: CONNECTION_STATE.DISCONNECTED,
  qrData: null,
};

const KeywordsSlice = createSlice({
  name: "whatsapp",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    resetFlags(state) {
      state.error = null;
      state.success = null;
    },
    connectionSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    storeFetchedMessages(state, action) {
      const { contactId, messages } = action.payload;
      state.fetchedMessages = {
        ...state.fetchedMessages,
        [contactId]: messages,
      };
    },
    addFetchedMessage(state, action) {
      const { contactId, message } = action.payload;
      state.fetchedMessages[contactId].push(message);
      if (contactId === state.activeContact.id) {
        state.messages = state.fetchedMessages[contactId];
      }
    },
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    getContactsSuccess(state, action) {
      state.loading = false;
      state.contacts = action.payload;
    },
    getMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    sendMessageSuccess(state, action) {
      // state.messages);
    },
    connectionError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setActiveContact(state, action) {
      state.activeContact = action.payload;
      const contactIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      if (state.activeContact?.id === action.payload.id) {
        state.contacts[contactIndex].newMessageCount = 0;
      }
    },
    udpateWhatsAppState(state, action) {
      state.whatsAppState = action.payload;
      if (action.payload === CONNECTION_STATE.DISCONNECTED) {
        state.messages = [];
        state.contacts = [];
        state.fetchedMessages = {};
        state.activeContact = null;
        state.qrData = null;
      }
    },
    qrDataReceived(state, action) {
      state.qrData = action.payload;
      state.whatsAppState = CONNECTION_STATE.SCAN_QR;
    },
    addNewMessageCount(state, action) {
      const contactIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      if (state.activeContact?.id !== action.payload.id) {
        state.contacts[contactIndex].newMessageCount += 1;
      }
    },
    toggleAutoPilotSuccess(state, action) {
      state.activeContact = action.payload;
      const contactIndex = state.contacts.findIndex((contact) => contact.id === action.payload.id);
      state.contacts[contactIndex].isAutopilot = action.payload.isAutopilot;
    },
  },
});

export const {
  resetFlags,
  startLoading,
  connectionSuccess,
  connectionError,
  setActiveContact,
  getContactsSuccess,
  getMessagesSuccess,
  sendMessageSuccess,
  storeFetchedMessages,
  addFetchedMessage,
  addNewMessage,
  addContact,
  udpateWhatsAppState,
  qrDataReceived,
  addNewMessageCount,
  toggleAutoPilotSuccess,
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
