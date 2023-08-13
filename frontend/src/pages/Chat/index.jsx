import Breadcrumbs from "Components/Common/Breadcrumb";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import { createSession } from "slices/thunk";
import { CONNECTION_STATE } from "slices/whatsapp/reducer";
import Chat from "./chat";
import ConnectWhatsapp from "./connect-whatsapp";
import ScanQRCard from "./scan-qr";

const ChatLayout = () => {
  document.title = "Chat | ";

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { whatsAppState, qrData } = useSelector((state) => ({
    whatsAppState: state.Whatsapp.whatsAppState,
    qrData: state.Whatsapp.qrData,
  }));

  useEffect(() => {
    if (whatsAppState === CONNECTION_STATE.SCAN_QR) {
      setLoading(false);
    }
  }, [whatsAppState]);

  const handleCreateSession = async () => {
    setLoading(true);
    dispatch(createSession());
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Chat" />
          {whatsAppState === CONNECTION_STATE.CONNECTED && <Chat />}
          {whatsAppState === CONNECTION_STATE.DISCONNECTED && (
            <ConnectWhatsapp isLoading={loading} onClick={handleCreateSession} />
          )}
          {whatsAppState === CONNECTION_STATE.WAITING_QR && (
            <ConnectWhatsapp isLoading={true} onClick={handleCreateSession} />
          )}
          {whatsAppState === CONNECTION_STATE.SCAN_QR && <ScanQRCard qr={qrData} />}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ChatLayout;
