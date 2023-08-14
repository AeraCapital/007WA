import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContactItem from "./contact-item";

const AgentItem = ({ agent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleContactItemClicked = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { activeAgent } = useSelector((state) => ({
    activeAgent: state.Messages.activeAgent,
  }));

  return (
    <li
      className={
        activeAgent?.id === agent.id || isDropdownOpen
          ? "metismenu list-unstyled mb-2 bg-white"
          : "metismenu list-unstyled mb-2"
      }>
      <Link to="#" onClick={handleContactItemClicked} className="position-relative">
        <div className="d-flex align-items-center">
          <div className="avatar-xs align-self-center me-3">
            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
              <i className="bx bx-street-view"></i>
            </span>
          </div>
          <div>
            <div className={`${activeAgent?.id === agent.id ? "text-black fw-bold" : ""}`}>
              {agent.firstName} {agent.middleName} {agent.lastName}
            </div>
            <div className="font-size-11">{agent.contacts.length} chats</div>
          </div>
          {isDropdownOpen ? (
            <i className="position-absolute top-1 end-0 m-3 bx bx-chevron-up"></i>
          ) : (
            <i className="position-absolute top-1 end-0 m-3 bx bx-chevron-down"></i>
          )}
        </div>
        <ul className="sub-menu">
          {isDropdownOpen &&
            agent.contacts.length > 0 &&
            agent.contacts.map((contact) => (
              <ContactItem key={agent.id} contact={contact} agent={agent} />
            ))}

          {isDropdownOpen && agent.contacts.length === 0 && (
            <li className="p-3 font-size-11">No chat with any contacts</li>
          )}
        </ul>
      </Link>
    </li>
  );
};

export default AgentItem;
