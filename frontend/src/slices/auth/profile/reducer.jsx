import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  error: "",
  success: "",
  user: {},
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileSuccess(state, action) {
      state.success = "Profile updated successfully";
      state.user = action.payload;
    },
    profileError(state, action) {
      state.error = action.payload;
    },
    editProfileChange(state) {
      state = { ...state };
    },
    resetProfileFlagChange(state) {
      // state.error = "",
      state.success = "";
    },
  },
});

export const { profileSuccess, profileError, editProfileChange, resetProfileFlagChange } =
  ProfileSlice.actions;

export default ProfileSlice.reducer;
