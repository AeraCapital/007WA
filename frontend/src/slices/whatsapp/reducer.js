import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
  contacts: [],
  messages: [],
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
    getContactsSuccess(state, action) {
      state.loading = false;
      state.contacts = action.payload;
    },
    getMessagesSuccess(state, action) {
      state.loading = false;
      state.messages = action.payload;
    },
    connectionError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetFlags,
  startLoading,
  connectionSuccess,
  connectionError,
  getContactsSuccess,
  getMessagesSuccess,
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
