import React from "react";
import QRCode from "qrcode.react";
import { Card, Row, Col, CardBody, CardTitle } from "reactstrap";

const ScanQRCard = ({ qr }) => {
  return (
    <Row>
      <Col md={7}>
        <Card className="p-4">
          <CardBody>
            <CardTitle>Scan the QR</CardTitle>
            <ol>
              <li>Open WhatsApp on your phone</li>
              <li>Goto Linked Devices</li>
              <li>Tap on Link a device</li>
              <li>Point your phone to this screen to capture the QR code</li>
            </ol>
            <QRCode value={qr} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ScanQRCard;
