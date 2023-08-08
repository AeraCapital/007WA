import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  successMsg: null,
  errorMsg: null,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetFlags(state) {
      state.successMsg = null;
      state.errorMsg = null;
    },
    startLoading(state) {
      state.loading = true;
      state.errorMsg = null;
      state.successMsg = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.successMsg = action.payload;
      state.errorMsg = null;
    },
    registerFailed(state, action) {
      state.loading = false;
      state.successMsg = null;
      state.errorMsg = action.payload;
    },
  },
});

export const { startLoading, resetFlags, registerSuccess, registerFailed } = registerSlice.actions;

export default registerSlice.reducer;
