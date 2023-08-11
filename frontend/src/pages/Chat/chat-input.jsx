import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Input, Row } from "reactstrap";
import { sendMessage } from "slices/thunk";

const ChatInput = ({ receiverPhone }) => {
  const [curMessage, setCurMessage] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (curMessage.trim() !== "") {
      dispatch(sendMessage({ id: receiverPhone, text: curMessage }));
    }
    setCurMessage(""); // Clear the input after submitting
  };

  return (
    <div className="p-3 chat-input-section">
      <Form onSubmit={handleSubmit}>
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
              type="submit"
              color="primary"
              className="btn btn-primary btn-rounded chat-send w-md">
              <span className="d-none d-sm-inline-block me-2">Send</span>
              <i className="mdi mdi-send" />
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChatInput;
