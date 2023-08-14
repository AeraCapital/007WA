import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
  agents: [],
  activeAgent: null,
  activeContact: null,
  messages: [],
};

const KeywordsSlice = createSlice({
  name: "messages",
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
    getAgentsSuccess(state, action) {
      state.loading = false;
      state.agents = action.payload;
    },
    setActiveAgent(state, action) {
      console.log("Active agent", action.payload);
      state.activeAgent = action.payload;
    },
    setActiveContact(state, action) {
      console.log(action.payload);
      state.activeContact = action.payload;
    },
    getAgentMessagesSuccess(state, action) {
      state.messages = action.payload;
    },
  },
});

export const {
  resetFlags,
  startLoading,
  connectionSuccess,
  getAgentsSuccess,
  getAgentMessagesSuccess,
  setActiveAgent,
  setActiveContact,
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
