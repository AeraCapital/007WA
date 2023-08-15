import EmptyMessage from "assets/images/empty-message.png";
import { formatMobileNumber } from "helpers/utils";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch } from "react-redux";
import { Card, Col, Row } from "reactstrap";
import { toggleAutoPilot } from "slices/thunk";
import ChatInput from "./chat-input";
import MessageItem from "./message-item";

const ChatInterface = ({ messages, activeContact }) => {
  const dispatch = useDispatch();
  const [messageBox, setMessageBox] = useState(null);

  const handleAutoPilot = () => {
    dispatch(toggleAutoPilot(!activeContact.isAutopilot, activeContact.id));
  };

  useEffect(() => {
    const scrollToBottom = () => {
      if (messageBox) {
        messageBox.scrollTop = messageBox.scrollHeight + 1000;
      }
    };
    scrollToBottom();
  }, [messageBox, messages]);

  return activeContact ? (
    <div className="w-100">
      <Card>
        <div>
          <div className="p-4 border-bottom ">
            <Row className="align-items-center">
              <Col>
                <h5 className="font-size-15 mb-1">{formatMobileNumber(activeContact.phone)}</h5>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <label className="form-check-label mx-2" htmlFor="autopilotSwitch">
                  Autopilot
                </label>
                <div className="form-check form-switch form-switch-md">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="autopilotSwitch"
                    checked={activeContact.isAutopilot}
                    onChange={handleAutoPilot}
                  />
                </div>
              </Col>
            </Row>
          </div>
          {/* Chat conversation */}
          <div className="chat-conversation p-3 pt-0">
            <ul className="list-unstyled">
              <PerfectScrollbar
                style={{ height: "53vh" }}
                containerRef={(ref) => setMessageBox(ref)}>
                {messages.map((message) => (
                  <MessageItem message={message} key={message.id} />
                ))}
              </PerfectScrollbar>
            </ul>
          </div>
          <ChatInput receiverPhone={activeContact.phone} />
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
