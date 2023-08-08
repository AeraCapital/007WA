import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  success: null,
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    profileSuccess(state, action) {
      state.success = action.payload;
      state.loading = false;
    },
    profileError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    editProfileChange(state) {
      state = { ...state };
    },
    resetProfileFlagChange(state) {
      state.error = null;
      state.success = null;
    },
  },
});

export const {
  startLoading,
  profileSuccess,
  profileError,
  editProfileChange,
  resetProfileFlagChange,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
