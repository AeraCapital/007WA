import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = (props) => {
  if (!props.isAdmin) {
    return <Navigate to={{ pathname: "/" }} />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AdminProtected;
