import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetching: false,
  fetchError: null,
  data: [],
  loading: false,
  error: null,
  success: null,
};

const AgentsSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    startFetching(state) {
      state.fetching = true;
      state.fetchError = null;
    },
    fetchSuccess(state, action) {
      state.fetching = false;
      state.data = action.payload;
      state.fetchError = null;
    },
    fetchError(state, action) {
      state.fetching = false;
      state.data = [];
      state.fetchError = action.payload;
    },
    startLoading(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    resetFlags(state) {
      state.error = null;
      state.success = null;
    },
    addAgentSuccessful(state, action) {
      state.data.push(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addAgentFailed(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    updateAgentSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = null;

      // Find the index of the updated agent in the data array
      const updatedAgentIndex = state.data.findIndex((agent) => agent.id === action.payload.id);

      if (updatedAgentIndex !== -1) {
        // If the agent is found, update it in the data array
        state.data[updatedAgentIndex] = action.payload;
      }
    },

    deleteAgentSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = null;

      // Find the index of the deleted keyword in the data array
      const deletedKeywordIndex = state.data.findIndex((agent) => agent.id === action.payload);

      if (deletedKeywordIndex !== -1) {
        // If the keyword is found, remove it from the data array
        state.data.splice(deletedKeywordIndex, 1);
      }
    },

    updateAgentFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    apiError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    resetAgentsState(state) {
      state.fetching = false;
      state.fetchError = null;
      state.data = [];
      state.loading = false;
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  startFetching,
  fetchSuccess,
  fetchError,
  startLoading,
  resetFlags,
  addAgentSuccessful,
  addAgentFailed,
  updateAgentSuccess,
  updateAgentFailed,
  deleteAgentSuccess,
  apiError,
  resetAgentsState,
} = AgentsSlice.actions;

export default AgentsSlice.reducer;
