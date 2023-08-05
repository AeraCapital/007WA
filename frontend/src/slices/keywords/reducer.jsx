import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  success: null,
};

const KeywordsSlice = createSlice({
  name: "keywords",
  initialState,
  reducers: {
    resetState(state) {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    addKeywordPending(state) {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    addKeywordSuccessful(state, action) {
      console.log("Payload:", action.payload);
      state.data.push(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addKeywordFailed(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    fetchKeywordsPending(state) {
      state.loading = true;
      state.error = null;
    },
    fetchKeywordsSuccessful(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchKeywordsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  resetState,
  addKeywordPending,
  addKeywordSuccessful,
  addKeywordFailed,
  fetchKeywordsPending,
  fetchKeywordsSuccessful,
  fetchKeywordsFailed,
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
