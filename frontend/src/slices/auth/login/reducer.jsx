import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: null,
  accessToken: null,
  error: null,
  loading: false,
  isLoggedIn: false,
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
      state.user = action.payload.user;
      state.accessToken = action.payload.access_token;
      state.loading = false;
      state.error = null;
      state.isLoggedIn = true;
    },
    loginError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUserSuccess(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    udpateWhatsappSession(state, action) {
      state.user = { ...state.user, activeWhatsappSession: action.payload };
    },
  },
});
export const {
  loginSuccess,
  loginError,
  resetLoginFlag,
  logoutUserSuccess,
  startLoading,
  updateUser,
  udpateWhatsappSession,
} = loginSlice.actions;
export default loginSlice.reducer;
