import Breadcrumbs from "Components/Common/Breadcrumb";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { getAgentswithContacts } from "slices/thunk";
import AgentsList from "./agents-list.jsx";
import MessageInterface from "./message-interface.jsx";

const Messages = () => {
  document.title = "Messages | ";
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAgentswithContacts());
  }, [dispatch]);

  const { agents, messages, activeContact } = useSelector((state) => ({
    agents: state.Messages.agents,
    messages: state.Messages.messages,
    activeContact: state.Messages.activeContact,
  }));

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="" breadcrumbItem="Messages" />
          <Row>
            <Col lg={12}>
              <div className="d-lg-flex">
                <AgentsList agents={agents} />
                <MessageInterface messages={messages} activeContact={activeContact} />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Messages;
