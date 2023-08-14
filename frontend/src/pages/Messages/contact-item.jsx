import { formatMobileNumber } from "helpers/utils";
import { useDispatch } from "react-redux";
import { setActiveAgent, setActiveContact } from "slices/messages/reducer";
import { getAgentMessages } from "slices/messages/thunk";

const ContactItem = ({ contact, agent }) => {
  const dispatch = useDispatch();

  const handleContactItemClicked = () => {
    dispatch(setActiveContact(contact));
    dispatch(setActiveAgent(agent));
    dispatch(getAgentMessages(agent.id, contact.id));
  };

  return (
    <li onClick={handleContactItemClicked}>
      <div className="p-3 mt-3 border-top border-bottom">{formatMobileNumber(contact.phone)}</div>
    </li>
  );
};

export default ContactItem;
