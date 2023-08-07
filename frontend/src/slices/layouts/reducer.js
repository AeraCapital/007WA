import { createSlice } from "@reduxjs/toolkit";
//constants
import {
  LAYOUT_TYPES,
  LAYOUT_MODE_TYPES,
  LAYOUT_WIDTH_TYPES,
  TOPBAR_THEME_TYPES,
  LEFT_SIDEBAR_TYPES,
  LEFT_SIDEBAR_THEME_TYPES,
  LEFTBAR_THEME_IMAGES_TYPES,
} from "../../Components/constants/layout";

export const initialState = {
  layoutTypes: LAYOUT_TYPES.VERTICAL,
  layoutModeTypes: LAYOUT_MODE_TYPES.LIGHT,
  layoutWidthTypes: LAYOUT_WIDTH_TYPES.FLUID,
  topbarThemeTypes: TOPBAR_THEME_TYPES.LIGHT,
  leftSidebarTypes: LEFT_SIDEBAR_TYPES.DEFAULT,
  leftSideBarThemeTypes: LEFT_SIDEBAR_THEME_TYPES.DARK,
  leftSidebarImageTypes: LEFTBAR_THEME_IMAGES_TYPES.NONE,
};

const LayoutSlice = createSlice({
  name: "LayoutSlice",
  initialState,
  reducers: {
    changeLayoutAction(state, action) {
      state.layoutTypes = action.payload;
    },
    changeLayoutModeAction(state, action) {
      state.layoutModeTypes = action.payload;
    },
    changeSidebarThemeAction(state, action) {
      state.leftSideBarThemeTypes = action.payload;
    },
    changeLayoutWidthAction(state, action) {
      state.layoutWidthTypes = action.payload;
    },
    changeLayoutSidebarAction(state, action) {
      state.leftSidebarTypes = action.payload;
    },
    changeTopbarThemeAction(state, action) {
      state.topbarThemeTypes = action.payload;
    },
    changeLeftsidebarViewTypeAction(state, action) {
      state.leftSidebarViewType = action.payload;
    },
    changeSidebarImageTypeAction(state, action) {
      state.leftSidebarImageTypes = action.payload;
    },
  },
});

export const {
  changeLayoutAction,
  changeLayoutModeAction,
  changeSidebarThemeAction,
  changeLayoutWidthAction,
  changeTopbarThemeAction,
  changeSidebarImageTypeAction,
  changeLayoutSidebarAction,
} = LayoutSlice.actions;

export default LayoutSlice.reducer;
