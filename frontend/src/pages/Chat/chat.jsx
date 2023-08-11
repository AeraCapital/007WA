import { useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getContacts, getMessage } from "slices/thunk";
import ChatInterface from "./chat-interface.jsx";
import ContactsList from "./contact-list.jsx";

const Chat = () => {
  const dispatch = useDispatch();

  const { contacts, messages, activeContact } = useSelector((state) => ({
    contacts: state.Whatsapp.contacts,
    messages: state.Whatsapp.messages,
    activeContact: state.Whatsapp.activeContact,
  }));

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    if (activeContact) {
      dispatch(getMessage(activeContact?.id));
    }
  }, [activeContact, dispatch]);

  return (
    <Row>
      <Col lg={12}>
        <div className="d-lg-flex">
          <ContactsList contacts={contacts} />
          <ChatInterface messages={messages} activeContact={activeContact} />
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
