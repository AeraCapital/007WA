import setupSocket from "helpers/socket";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CONNECTION_STATE, udpateWhatsAppState } from "slices/whatsapp/reducer";

const AuthProtected = (props) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { whatsAppState, isLoggedIn, user } = useSelector((state) => ({
    whatsAppState: state.Whatsapp.whatsAppState,
    isLoggedIn: state.Login.isLoggedIn,
    user: state.Login.user,
  }));

  useEffect(() => {
    if (user?.activeWhatsappSession) {
      dispatch(udpateWhatsAppState(CONNECTION_STATE.CONNECTED));
      setSocket(setupSocket(user.id, dispatch));
    }
    return () => {
      if (socket) {
        console.log("socket closed");
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (whatsAppState === CONNECTION_STATE.WAITING_QR) {
      setSocket(setupSocket(user.id, dispatch));
    }
    if (whatsAppState === CONNECTION_STATE.DISCONNECTED) {
      if (socket) {
        console.log("socket closed");
        socket.disconnect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, whatsAppState]);

  if (isLoggedIn) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return <Navigate to={{ pathname: "/login" }} />;
};

export default AuthProtected;
