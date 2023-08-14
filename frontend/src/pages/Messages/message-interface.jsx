import EmptyMessage from "assets/images/messages.svg";
import { formatMobileNumber } from "helpers/utils";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Card } from "reactstrap";
import MessageItem from "./message-item";

const MessageInterface = ({ messages, activeContact }) => {
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
                style={{ height: "62vh" }}
                containerRef={(ref) => setMessageBox(ref)}>
                {messages.length ? (
                  messages.map((message) => <MessageItem message={message} key={message.id} />)
                ) : (
                  <li>
                    <div className="m-3 ">No messages so far...</div>
                  </li>
                )}
              </PerfectScrollbar>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  ) : (
    <Card className="w-100 p-5 justify-content-center text-center">
      <img src={EmptyMessage} alt="" className="w-50 m-auto" />
      <p>Select an Agent to see their messages.</p>
    </Card>
  );
};

export default MessageInterface;
