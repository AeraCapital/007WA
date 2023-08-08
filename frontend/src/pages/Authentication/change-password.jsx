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
import { useFormik } from "formik";
import * as Yup from "yup";

//redux
import { useDispatch, useSelector } from "react-redux";
import { userChangePassword } from "../../slices/thunk";

import Breadcrumb from "Components/Common/Breadcrumb";
import withRouter from "Components/Common/withRouter";
import SubmitButton from "Components/submitButton";
import { resetFlags } from "slices/auth/changepwd/reducer";

const ChangePassword = () => {
  //meta title
  document.title = "Change Password | ";

  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => ({
    loading: state.ChangePassword.loading,
    error: state.ChangePassword.error,
    success: state.ChangePassword.success,
  }));

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Please Enter Your Old Password"),
      newPassword: Yup.string().required("Please Enter Your New Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please Confirm Your New Password"),
    }),

    onSubmit: (values) => dispatch(userChangePassword(values)),
  });

  useEffect(() => {
    if (success) {
      validation.resetForm();
    }
    if (success || error) {
      setTimeout(() => {
        dispatch(resetFlags());
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success, error]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Settings" breadcrumbItem="Change Password" />
          <Row>
            <Col md="6">
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
                        disabled={loading}
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
                        type="password"
                        placeholder="Enter new password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.newPassword || ""}
                        disabled={loading}
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

                    <div className="mb-3">
                      <Label className="form-label">Confirm Password</Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.confirmPassword || ""}
                        disabled={loading}
                        invalid={
                          validation.touched.confirmPassword && validation.errors.confirmPassword
                            ? true
                            : false
                        }
                      />
                      {validation.touched.confirmPassword && validation.errors.confirmPassword ? (
                        <FormFeedback type="invalid">
                          {validation.errors.confirmPassword}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className="mt-4">
                      <SubmitButton isLoading={loading}>Change Password</SubmitButton>
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
