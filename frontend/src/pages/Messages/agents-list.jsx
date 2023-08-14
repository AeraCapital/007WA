import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { Card, Input } from "reactstrap";
import ContactItem from "./agent-item.jsx"; // Import the sub-component

const AgentsList = ({ agents }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = agents.filter((agent) =>
    (agent.firstName + " " + (agent.middleName ? agent.middleName + " " : "") + agent.lastName)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="chat-leftsidebar me-md-3 p-3 bg-light">
      <div className="search-box chat-search-box pb-3">
        <div className="position-relative">
          <Input onChange={handleSearch} id="search-user" type="text" placeholder="Search..." />
          <i className="bx bx-search-alt search-icon" />
        </div>
      </div>
      <div>
        <h5 className="font-size-14 mb-3">Agents</h5>
        <ul className="list-unstyled chat-list">
          {filteredData.length ? (
            <PerfectScrollbar style={{ height: "53vh" }}>
              {filteredData.map((agent) => (
                <ContactItem key={agent.id} agent={agent} />
              ))}
            </PerfectScrollbar>
          ) : (
            <li className="p-2 pt-0">No Agents found</li>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default AgentsList;
