import React, { useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";

// Formik Validation
import Breadcrumb from "Components/Common/Breadcrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
//redux
import { useDispatch, useSelector } from "react-redux";
import { addKeyword } from "../../slices/keywords/thunk";
import { resetState } from "slices/keywords/reducer";
import withRouter from "Components/Common/withRouter";

const ChangePassword = () => {
  //meta title
  document.title = "Add Keyword | Dhoon";

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => ({
    error: state.Keywords.error,
    success: state.Keywords.success,
  }));

  const validation = useFormik({
    enableReinitialize: true, // enableReinitialize : use this flag when initial values needs to be changed
    initialValues: { keyword: "", reply: "" },

    validationSchema: Yup.object({
      keyword: Yup.string().required("Please Enter a Keyword"),
      reply: Yup.string().required("Please Enter a Reply"),
    }),

    onSubmit: (values) => {
      console.log(values);
      dispatch(addKeyword(values));
    },
  });

  useEffect(() => {
    // Reset success and error states in Redux store when component unmounts
    return () => {
      console.log("Component unmounting");
      dispatch(resetState());
    };
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Keywords" breadcrumbItem="Add keyword" />
          <Row>
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                    <div className="mb-3">
                      {success ? <Alert color="success">Keyword successfully added</Alert> : null}
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <Label className="form-label">Keyword</Label>
                      <Input
                        name="keyword"
                        className="form-control"
                        placeholder="Enter keyword"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.keyword || ""}
                        invalid={
                          validation.touched.keyword && validation.errors.keyword ? true : false
                        }
                      />
                      {validation.touched.keyword && validation.errors.keyword ? (
                        <FormFeedback type="invalid">{validation.errors.keyword}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">Reply</Label>
                      <Input
                        name="reply"
                        className="form-control"
                        placeholder="Enter reply"
                        type="textarea"
                        rows="5"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.reply || ""}
                        invalid={validation.touched.reply && validation.errors.reply ? true : false}
                      />
                      {validation.touched.reply && validation.errors.reply ? (
                        <FormFeedback type="invalid">{validation.errors.reply}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-4 d-grid">
                      <button className="btn btn-primary btn-block" type="submit">
                        Create
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ChangePassword);
