import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: "",
  error: null,
  loading: false,
  isUserLogout: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    resetLoginFlag(state) {
      state.error = null;
    },
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginError(state, action) {
      console.log(action.payload);
      state.error = action.payload;
      state.loading = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
    },
  },
});
export const { loginSuccess, loginError, resetLoginFlag, logoutUserSuccess, startLoading } =
  loginSlice.actions;
export default loginSlice.reducer;
