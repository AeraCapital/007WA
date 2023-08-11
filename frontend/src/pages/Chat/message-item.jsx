import { formatTimestamp } from "helpers/utils";

const MessageItem = ({ message }) => {
  const messageClass = message.type === "in" ? "" : "right";
  const messageWrapClass =
    message.type === "in" ? "ctext-wrap" : "ctext-wrap bg-primary text-light";

  return (
    <li className={messageClass}>
      <div className="conversation-list m-1">
        <div className={messageWrapClass}>
          <p>{message.body}</p>
          <p className="chat-time mb-0 font-size-11">
            <i className="bx bx-time-five align-middle me-1"></i>
            {formatTimestamp(message.messageTimestamp)}
          </p>
        </div>
      </div>
    </li>
  );
};

export default MessageItem;
