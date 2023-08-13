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
      state.data.push(action.payload);
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    fetchKeywordsSuccessful(state, action) {
      state.loading = false;
      state.data = action.payload;
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
    apiError(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    deleteKeywordSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.error = null;

      // Find the index of the deleted keyword in the data array
      const deletedKeywordIndex = state.data.findIndex((keyword) => keyword.id === action.payload);

      if (deletedKeywordIndex !== -1) {
        // If the keyword is found, remove it from the data array
        state.data.splice(deletedKeywordIndex, 1);
      }
    },
  },
});

export const {
  resetFlags,
  startLoading,
  addKeywordSuccessful,
  fetchKeywordsSuccessful,
  updateKeywordSuccess,
  deleteKeywordSuccess,
  apiError,
} = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
