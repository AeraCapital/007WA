import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { connectWhatsapp } from "slices/thunk";
import { io } from "socket.io-client";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import QRCode from "qrcode.react";

const Whatsapp = () => {
  const dispatch = useDispatch();
  const [connecting, setConnecting] = useState(false);
  const [qr, setQR] = useState(null);

  const handleConnectionButton = () => {
    if (!connecting) {
      setConnecting(true);
      dispatch(connectWhatsapp());
    }
  };

  //meta title
  document.title = "Whatsapp | Dhoon";

  const { success } = useSelector((state) => ({
    success: state.Whatsapp.success,
  }));

  let userId = "eb31d6c2-6795-4e0c-b4ec-3479d638c1c3";
  useEffect(() => {
    if (success) {
      console.log("Connection successful");

      const serverURL = "http://localhost:3002"; // Replace this with your actual server URL
      const socket = io(serverURL);

      // Handle events from the server
      socket.on("connect", () => {
        console.log("Connected to the server");
        socket.emit("join", userId);
      });

      // Error handling
      socket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error);
        setConnecting(false);
      });

      socket.on(userId, (data) => {
        if (data.type === "qr") {
          const qrData = data.qr;
          setQR(qrData);
          console.log("Received QR data:", qrData);
        } else {
          console.log("Received data of type:", data.type);
        }
      });
      // Disconnection handling
      socket.on("disconnect", () => {
        console.log("Disconnected from the server");
        setConnecting(false);
      });

      // Clean up the socket connection when the component unmounts
      return () => {
        socket.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Dhoon" breadcrumbItem="Connect whatsapp" />
          <Row>
            <Col>
              {qr ? <QRCode value={qr} /> : null}
              <Card>
                <CardBody>
                  <Button onClick={handleConnectionButton} disabled={connecting}>
                    {connecting ? "Connecting..." : "Connect Whatsapp"}
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Whatsapp;
