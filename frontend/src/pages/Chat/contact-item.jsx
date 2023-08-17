import { formatMobileNumber } from "helpers/utils";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveContact } from "slices/whatsapp/reducer";

const ContactItem = ({ contact }) => {
  const dispatch = useDispatch();

  const handleContactItemClicked = (contact) => {
    dispatch(setActiveContact(contact));
  };

  const { activeContact } = useSelector((state) => ({
    activeContact: state.Whatsapp.activeContact,
  }));

  return (
    <li className={activeContact?.phone === contact.phone ? "active" : ""}>
      <Link to="#" onClick={() => handleContactItemClicked(contact)} className="position-relative">
        <div className="d-flex align-items-center">
          <div className="avatar-xs align-self-center me-3">
            <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
              <i className="bx bx-user"></i>
            </span>
          </div>
          <div>{formatMobileNumber(contact.phone)}</div>
          {contact.isAutopilot ? (
            <div className="badge rounded-pill bg-primary  m-2">Autopilot on</div>
          ) : (
            <div className="badge rounded-pill bg-danger m-2">Autopilot off</div>
          )}
        </div>
        {!(contact.newMessageCount === 0) && (
          <span className="badge rounded-pill bg-success position-absolute top-0 end-0 m-2">
            {contact.newMessageCount}
          </span>
        )}
      </Link>
    </li>
  );
};

export default ContactItem;
