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
    startLoading(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    resetFlags(state) {
      state.error = null;
      state.success = null;
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
    fetchKeywordsSuccessful(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchKeywordsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateKeywordSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = null;

      // Find the index of the updated keyword in the data array
      const updatedKeywordIndex = state.data.findIndex(
        (keyword) => keyword.id === action.payload.id
      );

      if (updatedKeywordIndex !== -1) {
        // If the keyword is found, update it in the data array
        state.data[updatedKeywordIndex] = action.payload;
      }
    },

    updateKeywordFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  resetFlags,
  startLoading,
  addKeywordSuccessful,
  addKeywordFailed,
  fetchKeywordsSuccessful,
  fetchKeywordsFailed,
  updateKeywordSuccess,
  updateKeywordFailed,
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
