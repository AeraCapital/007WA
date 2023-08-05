import React from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";

//redux
import { useDispatch, useSelector } from "react-redux";
import { userChangePassword } from "../../slices/thunk";

import withRouter from "Components/Common/withRouter";

const ChangePassword = () => {
  //meta title
  document.title = "Change Password | Dhoon";

  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => ({
    error: state.ChangePassword.error,
    success: state.ChangePassword.success,
  }));

  const validation = useFormik({
    enableReinitialize: true, // enableReinitialize : use this flag when initial values needs to be changed
    initialValues: { oldPassword: "", newPassword: "" },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please Enter Your Old Password"),
      newPassword: Yup.string().required("Please Enter Your New Password"),
    }),

    onSubmit: (values) => {
      console.log(values);
      dispatch(userChangePassword(values));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={8} lg={6} xl={5}>
              <h4 className="mb-3 font-size-16 fw-bold">CHANGE PASSWORD</h4>

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
                      {success ? <Alert color="success">{success}</Alert> : null}
                      {error ? <Alert color="danger">{error}</Alert> : null}
                      <Label className="form-label">Old Password</Label>
                      <Input
                        name="oldPassword"
                        className="form-control"
                        placeholder="Enter old password"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.oldPassword || ""}
                        invalid={
                          validation.touched.oldPassword && validation.errors.oldPassword
                            ? true
                            : false
                        }
                      />
                      {validation.touched.oldPassword && validation.errors.oldPassword ? (
                        <FormFeedback type="invalid">{validation.errors.oldPassword}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label className="form-label">New Password</Label>
                      <Input
                        name="newPassword"
                        type="newPassword"
                        placeholder="Enter new password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.newPassword || ""}
                        invalid={
                          validation.touched.newPassword && validation.errors.newPassword
                            ? true
                            : false
                        }
                      />
                      {validation.touched.newPassword && validation.errors.newPassword ? (
                        <FormFeedback type="invalid">{validation.errors.newPassword}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-4 w-md">
                      <button className="btn btn-primary btn-block" type="submit">
                        Change Password
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
