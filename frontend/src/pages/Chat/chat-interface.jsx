import EmptyMessage from "assets/images/empty-message.png";
import { formatMobileNumber } from "helpers/utils";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Button, Card, Col, Input, Row } from "reactstrap";
import MessageItem from "./message-item";

const ChatInterface = ({ msgData, activeContact }) => {
  const [curMessage, setCurMessage] = useState("");

  return activeContact ? (
    <div className="w-100">
      <Card>
        <div className="p-4 border-bottom ">
          <h5 className="font-size-15 mb-1">{formatMobileNumber(activeContact.phone)}</h5>
        </div>
        <div>
          {/* Chat conversation */}
          <div className="chat-conversation p-3 pt-0">
            <ul className="list-unstyled">
              <PerfectScrollbar style={{ height: "400px" }}>
                {msgData.map((message) => (
                  <MessageItem message={message} />
                ))}
              </PerfectScrollbar>
            </ul>
          </div>
          {/* Chat input section */}
          <div className="p-3 chat-input-section">
            <Row>
              <Col>
                <div className="position-relative">
                  <Input
                    type="text"
                    value={curMessage}
                    onChange={(e) => setCurMessage(e.target.value)}
                    className="chat-input"
                    placeholder="Enter Message..."
                  />
                </div>
              </Col>
              <Col className="col-auto">
                <Button
                  type="button"
                  color="primary"
                  onClick={() => console.log("Clicked")}
                  className="btn btn-primary btn-rounded chat-send w-md ">
                  <span className="d-none d-sm-inline-block me-2">Send</span>
                  <i className="mdi mdi-send" />
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    <Card className="w-100 p-5 justify-content-center text-center">
      <img src={EmptyMessage} alt="" className="w-50 m-auto" />
      <p>Get all of your WhatsApp message here!</p>
    </Card>
  );
};

export default ChatInterface;
