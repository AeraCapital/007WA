import setupSocket from "helpers/socket";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { CONNECTION_STATE, udpateWhatsAppState } from "slices/whatsapp/reducer";

const AuthProtected = (props) => {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const { whatsAppState } = useSelector((state) => ({
    whatsAppState: state.Whatsapp.whatsAppState,
  }));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      if (obj.user.activeWhatsappSession) {
        dispatch(udpateWhatsAppState(CONNECTION_STATE.CONNECTED));
        setSocket(setupSocket(obj.user.id, dispatch));
      }
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
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setSocket(setupSocket(obj.user.id, dispatch));
    }
    if (whatsAppState === CONNECTION_STATE.DISCONNECTED) {
      if (socket) {
        console.log("socket closed");
        socket.disconnect();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, whatsAppState]);

  if (!localStorage.getItem("authUser")) {
    return <Navigate to={{ pathname: "/login" }} />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthProtected;
