import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  success: null,
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
  },
});

export const { resetFlags, startLoading, connectionSuccess } = KeywordsSlice.actions;

export default KeywordsSlice.reducer;
