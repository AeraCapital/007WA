import React, { useEffect } from "react";
import withRouter from "Components/Common/withRouter";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { CONNECTION_STATE, udpateWhatsAppState } from "slices/whatsapp/reducer";

const Logout = () => {
  const dispatch = useDispatch();

  const { isUserLogout } = useSelector((state) => ({
    isUserLogout: state.Login.isUserLogout,
  }));

  useEffect(() => {
    dispatch(udpateWhatsAppState(CONNECTION_STATE.DISCONNECTED));
    dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

export default withRouter(Logout);
