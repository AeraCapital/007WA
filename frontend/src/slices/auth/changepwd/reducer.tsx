import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  success: null,
  error: null,
  loading: false,
};

const changePasswordSlice = createSlice({
  name: "changepwd",
  initialState,
  reducers: {
    resetFlags(state) {
      state.success = null;
      state.error = null;
    },
    startLoading(state) {
      state.loading = true;
      state.success = null;
      state.error = null;
    },
    userChangePasswordSuccess(state, action) {
      state.success = action.payload;
      state.loading = false;
    },
    userChangePasswordError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { startLoading, resetFlags, userChangePasswordSuccess, userChangePasswordError } =
  changePasswordSlice.actions;

export default changePasswordSlice.reducer;
