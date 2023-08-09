import { Link } from "react-router-dom";
import { formatMobileNumber } from "helpers/utils";

const ContactItem = ({ contact, activeContact, setActiveContact }) => {
  return (
    <li className={activeContact?.phone === contact.phone ? "active" : ""}>
      <Link to="#" onClick={() => setActiveContact(contact)}>
        <div className="d-flex align-items-center">
          <div className="avatar-xs align-self-center me-3">
            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
              <i className="bx bx-user"></i>
            </span>
          </div>
          <div>{formatMobileNumber(contact.phone)}</div>
        </div>
      </Link>
    </li>
  );
};

export default ContactItem;
