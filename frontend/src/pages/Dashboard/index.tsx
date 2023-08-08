import React from "react";
import { Container } from "reactstrap";

import Breadcrumb from "Components/Common/Breadcrumb";

const Dashboard = () => {
  document.title = "Dashboards | Dhoon";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Dashboards" breadcrumbItem="Dashboards" />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
