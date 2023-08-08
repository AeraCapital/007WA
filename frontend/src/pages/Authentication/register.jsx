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
import SubmitButton from "Components/submitButton";
import { useFormik } from "formik";
import * as Yup from "yup";

// action
import { registerUser } from "../../slices/thunk";

//redux
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import withRouter from "Components/Common/withRouter";
import LogoIcon from "Components/LogoIcon";

// import images
import { resetFlags } from "slices/auth/register/reducer";
import profileImg from "../../assets/images/profile-img.png";

const Register = (props) => {
  //meta title
  document.title = "Signup | ";

  const dispatch = useDispatch();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstName: Yup.string().required("Please Enter Your First Name"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Please Enter Your Last Name"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => dispatch(registerUser(values, props.router.navigate)),
  });

  const { loading, successMsg, errorMsg } = useSelector((state) => ({
    loading: state.Register.loading,
    errorMsg: state.Register.errorMsg,
  }));

  useEffect(() => {
    if (successMsg) {
      validation.resetForm();
    }
    if (errorMsg) {
      setTimeout(() => {
        dispatch(resetFlags());
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successMsg, errorMsg]);

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
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
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
                      {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}

                      {/* First Name */}
                      <div className="mb-3">
                        <Label className="form-label">First Name</Label>
                        <Input
                          name="firstName"
                          type="text"
                          placeholder="Enter first name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.firstName || ""}
                          invalid={
                            validation.touched.firstName && validation.errors.firstName
                              ? true
                              : false
                          }
                        />
                        {validation.touched.firstName && validation.errors.firstName ? (
                          <FormFeedback type="invalid">{validation.errors.firstName}</FormFeedback>
                        ) : null}
                      </div>

                      {/* Middle Name */}
                      <div className="mb-3">
                        <Label className="form-label">Middle Name</Label>
                        <Input
                          name="middleName"
                          type="text"
                          placeholder="Enter middle name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.middleName || ""}
                        />
                      </div>

                      {/* Last Name */}
                      <div className="mb-3">
                        <Label className="form-label">Last Name</Label>
                        <Input
                          name="lastName"
                          type="text"
                          placeholder="Enter last name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.lastName || ""}
                          invalid={
                            validation.touched.lastName && validation.errors.lastName ? true : false
                          }
                        />
                        {validation.touched.lastName && validation.errors.lastName ? (
                          <FormFeedback type="invalid">{validation.errors.lastName}</FormFeedback>
                        ) : null}
                      </div>

                      {/* Email */}
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
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

                      {/* Password */}
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
                        <SubmitButton isLoading={loading}>Register</SubmitButton>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <p className="text-center">
                Already have an account ?
                <Link to="/login" className="m-1 font-weight-medium text-primary">
                  Login
                </Link>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Register);
