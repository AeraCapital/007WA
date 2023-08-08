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

//redux
import { useDispatch, useSelector } from "react-redux";

import withRouter from "Components/Common/withRouter";
import SubmitButton from "Components/submitButton";
import { Link } from "react-router-dom";

// Formik Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// action
import { userForgetPassword } from "../../slices/thunk";

import { resetFlags } from "slices/auth/forgetpwd/reducer";

// import images
import logo from "../../assets/images/logo.png";
import profile from "../../assets/images/profile-img.png";

const ForgetPasswordPage = (props) => {
  //meta title
  document.title = "Forget Password | ";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: { email: "" },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Please Enter Your Email"),
    }),

    onSubmit: (values) => dispatch(userForgetPassword(values, props.history)),
  });

  const { loading, errorMsg, successMsg } = useSelector((state) => ({
    loading: state.ForgetPassword.loading,
    errorMsg: state.ForgetPassword.errorMsg,
    successMsg: state.ForgetPassword.successMsg,
  }));

  useEffect(() => {
    if (errorMsg || successMsg) {
      setTimeout(() => {
        dispatch(resetFlags());
      }, 2000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorMsg, successMsg]);

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
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Forgot Password</h5>
                        <p>Reset it here.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="dashboard">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img src={logo} alt="" className="rounded-circle" height="34" />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}
                    {successMsg ? <Alert color="success">{successMsg}</Alert> : null}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mt-4">
                        <SubmitButton isLoading={loading}>Reset</SubmitButton>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <p className="text-center">
                Remember It ?
                <Link to="/login" className="m-1 fw-medium text-primary">
                  Sign In
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ForgetPasswordPage);
