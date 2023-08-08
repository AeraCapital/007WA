import React from "react";
import logo from "../../assets/images/logo.png";

const LogoIcon = () => {
  return (
    <div className="avatar-md profile-user-wid mb-4">
      <span className="avatar-title rounded-circle bg-light">
        <img src={logo} alt="" className="rounded-circle" height="34" />
      </span>
    </div>
  );
};

export default LogoIcon;
