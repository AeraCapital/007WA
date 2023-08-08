import React from "react";
import { Link } from "react-router-dom";

//import components
import SidebarContent from "./SidebarContent";

//import images
// import logo from "../../assets/images/logo.png";
// import logoLight from "../../assets/images/logo-light.png";

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          {/* <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src={logoLight} alt="" height="17" />
            </span>
          </Link> */}
        </div>
        <div data-simplebar className="h-100">
          {props.type !== "condensed" ? <SidebarContent /> : <SidebarContent />}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
