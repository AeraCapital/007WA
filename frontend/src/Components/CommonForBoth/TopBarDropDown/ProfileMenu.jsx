import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import { Link } from "react-router-dom";
import withRouter from "../../Common/withRouter";

// users

import { useSelector } from "react-redux";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const { firstName } = useSelector((state) => state.Login.user);
  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="d-inline-block">
        <DropdownToggle className="btn header-item " id="page-header-user-dropdown" tag="button">
          <span className="d-none d-xl-inline-block ms-2 fw-bold me-1">{firstName}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu-end">
          <Link to="/my-profile">
            <DropdownItem>
              <i className="bx bx-user font-size-16 align-middle me-2" />
              {props.t("My Profile")}
            </DropdownItem>
          </Link>

          <Link to="/change-password">
            <DropdownItem>
              {/* <span className="badge bg-success float-end">11</span> */}
              <i className="bx bx-wrench font-size-16 align-middle me-2" />
              {props.t("Change Password")}
            </DropdownItem>
          </Link>

          <div className="dropdown-divider" />

          <Link to="/logout" className="dropdown-item">
            <i className="bx bx-power-off font-size-16 align-middle me-2 text-danger" />
            <span>{props.t("Logout")}</span>
          </Link>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(ProfileMenu));
