import { Button, Card, CardBody, Col, Row, Spinner } from "reactstrap";

const ConnectWhatsapp = ({ isLoading, onClick }) => {
  return (
    <Row>
      <Col lg={6}>
        <Card>
          <div className="p-1 border-bottom ">
            <CardBody>
              <h5 className="card-title">You are not connected to WhatsApp</h5>
              <p className="card-text">Connect now to see your messages.</p>
              <Button color="success" className="mt-3" onClick={onClick} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="light" className="me-2" /> Loading...
                  </>
                ) : (
                  "Connect to WhatsApp"
                )}
              </Button>
            </CardBody>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default ConnectWhatsapp;
