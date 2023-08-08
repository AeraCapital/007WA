import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  successMsg: null,
  errorMsg: null,
};

const resetPasswordSlice = createSlice({
  name: "resetpwd",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.errorMsg = null;
      state.successMsg = null;
    },
    resetFlags(state) {
      state.successMsg = null;
      state.errorMsg = null;
    },
    userResetPasswordSuccess(state, action) {
      state.successMsg = action.payload;
      state.loading = false;
    },
    userResetPasswordError(state, action) {
      state.errorMsg = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, resetFlags, userResetPasswordSuccess, userResetPasswordError } =
  resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
