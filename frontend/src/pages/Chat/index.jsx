import Breadcrumbs from "Components/Common/Breadcrumb";
import setupSocket from "helpers/socket";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { createSession } from "slices/thunk";
import { resetFlags } from "slices/whatsapp/reducer";
import Chat from "./chat";
import WhatsappButton from "./connect-whatsapp";
import QRCard from "./qr";

const ChatLayout = () => {
  const [userId, setUserId] = useState("");
  const [activeSession, setActiveSession] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [qr, setQR] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser") || "");
      setUserId(obj.user.id);
      setActiveSession(obj.user.activeWhatsappSession);
    }
  }, []);

  const { success, sessionLoading } = useSelector((state) => ({
    sessionLoading: state.Whatsapp.loading,
    success: state.Whatsapp.success,
  }));

  useEffect(() => {
    if (success) {
      setQrLoading(true);
      const socket = setupSocket(userId);

      socket.on(userId, (data) => {
        if (data.type === "qr") {
          const qrData = data.qr;
          setQR(qrData);
          setQrLoading(false);
          console.log("Received QR data:", qrData);
        } else {
          setActiveSession(true);
          console.log("Received data of type:", data.type);
        }
      });

      return () => {
        dispatch(resetFlags());
        socket.disconnect();
        setQrLoading(false);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const dispatch = useDispatch();

  const handleConnection = () => {
    dispatch(createSession());
    setQrLoading(true);
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
                <WhatsappButton
                  isLoading={sessionLoading || qrLoading}
                  onClick={handleConnection}
                />
              )}
            </>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChatLayout;
