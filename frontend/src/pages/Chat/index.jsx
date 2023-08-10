import Breadcrumbs from "Components/Common/Breadcrumb";
import setupSocket from "helpers/socket";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { createSession } from "slices/thunk";
import Chat from "./chat";
import WhatsappButton from "./connect-whatsapp";
import QRCard from "./qr";

const ChatLayout = () => {
  const [userId, setUserId] = useState("");
  const [activeSession, setActiveSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qr, setQR] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setUserId(obj.user.id);
      setActiveSession(obj.user.activeWhatsappSession);
    }
  }, []);

  const { success } = useSelector((state) => ({
    success: state.Whatsapp.success,
  }));

  useEffect(() => {
    if (success) {
      const socket = setupSocket(userId);

      socket.on(userId, (data) => {
        if (data.type === "qr") {
          const qrData = data.qr;
          setQR(qrData);
          setLoading(false);
        } else {
          if (!activeSession) {
            setActiveSession(true);
            let authData = JSON.parse(localStorage.getItem("authUser"));
            authData.user.activeWhatsappSession = true;
            localStorage.setItem("authUser", JSON.stringify(authData));
          }
          if (data.type === "") {
            
          }
          console.log("Received data of type:", data.type);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const dispatch = useDispatch();

  const handleConnection = () => {
    setLoading(true);
    dispatch(createSession());
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Messages" />
          {activeSession ? (
            <Chat />
          ) : (
            <>
              {qr ? (
                <QRCard qr={qr} />
              ) : (
                <WhatsappButton isLoading={loading} onClick={handleConnection} />
              )}
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChatLayout;