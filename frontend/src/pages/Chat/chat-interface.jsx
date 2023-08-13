import EmptyMessage from "assets/images/empty-message.png";
import { formatMobileNumber } from "helpers/utils";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Card } from "reactstrap";
import ChatInput from "./chat-input";
import MessageItem from "./message-item";

const ChatInterface = ({ messages, activeContact }) => {
  const [messageBox, setMessageBox] = useState(null);

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
        <div className="p-4 border-bottom ">
          <h5 className="font-size-15 mb-1">{formatMobileNumber(activeContact.phone)}</h5>
        </div>
        <div>
          {/* Chat conversation */}
          <div className="chat-conversation p-3 pt-0">
            <ul className="list-unstyled">
              <PerfectScrollbar
                style={{ height: "400px" }}
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
