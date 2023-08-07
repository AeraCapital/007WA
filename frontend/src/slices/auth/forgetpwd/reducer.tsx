import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  errorMsg: null,
  successMsg: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotpwd",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.errorMsg = null;
      state.successMsg = null;
    },
    resetFlags(state) {
      state.errorMsg = null;
      state.successMsg = null;
    },
    userForgetPasswordSuccess(state, action) {
      state.successMsg = action.payload;
      state.loading = false;
    },
    userForgetPasswordError(state, action) {
      state.errorMsg = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, resetFlags, userForgetPasswordSuccess, userForgetPasswordError } =
  forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
