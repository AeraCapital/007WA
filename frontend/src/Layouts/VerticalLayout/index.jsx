import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLayout,
  changeLayoutMode,
  changeLeftSidebarTheme,
  changeLeftSidebarType,
  changeSidebarImageType,
  changeTopbarTheme,
} from "slices/layouts/thunk";
import withRouter from "../../Components/Common/withRouter";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

const VerticalLayout = (props) => {
  const dispatch = useDispatch();
  const {
    layoutTypes,
    layoutModeTypes,
    topbarThemeTypes,
    leftSidebarTypes,
    leftSideBarThemeTypes,
    leftSidebarImageTypes,
  } = useSelector((state) => ({
    layoutTypes: state.Layout.layoutTypes,
    layoutModeTypes: state.Layout.layoutModeTypes,
    layoutWidthTypes: state.Layout.layoutWidthTypes,
    topbarThemeTypes: state.Layout.topbarThemeTypes,
    leftSidebarTypes: state.Layout.leftSidebarTypes,
    leftSideBarThemeTypes: state.Layout.leftSideBarThemeTypes,
    leftSidebarImageTypes: state.Layout.leftSidebarImageTypes,
  }));

  const [open, setOpen] = useState(false);
  const toggleCanvas = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (
      layoutTypes ||
      layoutModeTypes ||
      topbarThemeTypes ||
      leftSidebarTypes ||
      leftSideBarThemeTypes ||
      leftSidebarImageTypes
    ) {
      dispatch(changeLayout(layoutTypes));
      dispatch(changeLayoutMode(layoutModeTypes));
      dispatch(changeTopbarTheme(topbarThemeTypes));
      dispatch(changeLeftSidebarType(leftSidebarTypes));
      dispatch(changeLeftSidebarTheme(leftSideBarThemeTypes));
      dispatch(changeSidebarImageType(leftSidebarImageTypes));
    }
  }, [
    dispatch,
    layoutTypes,
    layoutModeTypes,
    topbarThemeTypes,
    leftSidebarTypes,
    leftSideBarThemeTypes,
    leftSidebarImageTypes,
  ]);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header toggleCanvas={toggleCanvas} />
        <Sidebar />
        <div className="main-content">
          {props.children}
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(VerticalLayout);
