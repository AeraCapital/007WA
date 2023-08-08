import React from "react";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div id="layout-wrapper">{children}</div>
    </React.Fragment>
  );
};

export default Layout;
