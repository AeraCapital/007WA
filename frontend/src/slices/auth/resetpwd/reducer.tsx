import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  resetSuccessMsg: null,
  resetError: null,
};

const resetPasswordSlice = createSlice({
  name: "resetpwd",
  initialState,
  reducers: {
    userResetPasswordSuccess(state, action) {
      state.resetSuccessMsg = action.payload;
    },
    userResetPasswordError(state, action) {
      state.resetError = action.payload;
    },
  },
});

export const { userResetPasswordSuccess, userResetPasswordError } = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
