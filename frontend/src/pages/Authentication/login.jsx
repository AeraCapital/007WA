import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import
  {
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

import SubmitButton from "Components/submitButton";
import { useFormik } from "formik"; // Formik validation
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import LogoIcon from "Components/LogoIcon";

// import images
import profile from "../../assets/images/profile-img.png";

//import thunk
import { resetLoginFlag } from "slices/auth/login/reducer";
import { loginUser } from "slices/auth/login/thunk";

import withRouter from "Components/Common/withRouter";

const Login = (props) => {
  const dispatch = useDispatch();

  //meta title
  document.title = "Login";

  const { error, loading } = useSelector((state) => ({
    error: state.Login.error,
    loading: state.Login.loading,
  }));

  // Form validation
  const validation = useFormik({
    enableReinitialize: true, // enableReinitialize : use this flag when initial values needs to be changed
    initialValues: { email: "", password: "" },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Please Enter Your email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: (values) => dispatch(loginUser(values, props.router.navigate)),
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetLoginFlag());
      }, 2000);
    }
  }, [dispatch, error]);

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>

                <CardBody className="pt-0">
                  <LogoIcon />
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}>
                      <div className="mb-3">
                        {error ? <Alert color="danger">{error}</Alert> : null}
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="text"
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

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4 d-grid">
                        <SubmitButton isLoading={loading}>Log In</SubmitButton>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              {/* <div className="text-center">
                <p>
                  Don&apos;t have an account?
                  <Link to="/register" className="m-1 fw-medium text-primary">
                    Signup
                  </Link>
                </p>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
