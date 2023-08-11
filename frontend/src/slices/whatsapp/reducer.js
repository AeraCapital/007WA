import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
  activeContact: null,
  contacts: [],
  messages: [],
  fetchedMessages: {},
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
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
