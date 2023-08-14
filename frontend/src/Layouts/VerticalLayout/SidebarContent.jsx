import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import withRouter from "../../Components/Common/withRouter";

const SidebarContent = (props) => {
  const ref = useRef();

  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useSelector((state) => ({
    user: state.Login.user,
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setIsAdmin(obj.user.role === "admin");
    }
  }, [user]);

  const isActivePage = (path) => props.router.location.pathname === path;

  const navLinks = [
    { path: "/chat", icon: "bx bx-chat", label: "Chat", isAdminOnly: false },
    { path: "/keywords", icon: "bx bx-file", label: "Keywords", isAdminOnly: true },
    { path: "/agents", icon: "bx bx-street-view", label: "Agents", isAdminOnly: true },
  ];

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {navLinks.map(
              ({ path, icon, label, isAdminOnly }) =>
                (!isAdminOnly || isAdmin) && (
                  <li key={path}>
                    <Link to={path}>
                      <i className={`${icon} ${isActivePage(path) ? "mm-active" : ""}`}></i>
                      <span className={isActivePage(path) ? "mm-active" : ""}>{label}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

export default withRouter(SidebarContent);
