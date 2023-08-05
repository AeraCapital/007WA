import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  changeSuccessMsg: null,
  changeError: null,
};

const changePasswordSlice = createSlice({
  name: "changepwd",
  initialState,
  reducers: {
    userChangePasswordSuccess(state, action) {
      state.changeSuccessMsg = action.payload;
    },
    userChangePasswordError(state, action) {
      state.changeError = action.payload;
    },
  },
});

export const { userChangePasswordSuccess, userChangePasswordError } = changePasswordSlice.actions;

export default changePasswordSlice.reducer;
