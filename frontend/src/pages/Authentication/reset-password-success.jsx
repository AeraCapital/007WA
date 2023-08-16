import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const ResetPasswordSuccess = () => {
  //meta title
  document.title = "Confirm Mail | ";

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="p-2 mt-4">
                        <div className="avatar-md mx-auto">
                          <div className="avatar-title rounded-circle bg-light">
                            <i className="bx bx-check h1 mb-0 text-success"></i>
                          </div>
                        </div>
                      </div>
                      <h4>Success!</h4>
                      <p className="text-muted">Password Reset Successfully</p>
                      <div className="w-md">
                        <Link to="/login" className="btn btn-primary">
                          Go to Login
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ResetPasswordSuccess;
