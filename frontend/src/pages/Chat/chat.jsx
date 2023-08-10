import { useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import { getContacts, getMessage } from "slices/thunk";
import ChatInterface from "./chat-interface.jsx";
import ContactsList from "./contact-list.jsx";

const Chat = () => {
  const [activeContact, setActiveContact] = useState(null);
  const dispatch = useDispatch();

  const { contacts, messages } = useSelector((state) => ({
    contacts: state.Whatsapp.contacts,
    messages: state.Whatsapp.messages,
  }));

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    if (activeContact) {
      dispatch(getMessage(activeContact.id));
    }
  }, [activeContact, dispatch]);

  return (
    <Row>
      <Col lg={12}>
        <div className="d-lg-flex">
          <ContactsList
            contacts={contacts}
            activeContact={activeContact}
            setActiveContact={setActiveContact}
          />
          <ChatInterface msgData={messages} activeContact={activeContact} />
        </div>
      </Col>
    </Row>
  );
};

export default Chat;
