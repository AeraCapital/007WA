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

import SubmitButton from "Components/submitButton";

import withRouter from "Components/Common/withRouter";
import { Link } from "react-router-dom";

// Formik Validation
import { useFormik } from "formik";
import * as Yup from "yup";

// action
import { userResetPassword } from "../../slices/thunk";

import LogoIcon from "Components/LogoIcon";
// import images
import { resetFlags } from "slices/auth/resetpwd/reducer";
import profile from "../../assets/images/profile-img.png";

const ResetPasswordPage = (props) => {
  const id = props.router.params.id;

  //meta title
  document.title = "Reset Password | ";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      newPassword: "",
    },

    validationSchema: Yup.object({
      newPassword: Yup.string().required("Please Enter a New Password"),
    }),

    onSubmit: (values) => dispatch(userResetPassword(values, id, props.router.navigate)),
  });

  const { loading, errorMsg, successMsg } = useSelector((state) => ({
    loading: state.ResetPassword.loading,
    errorMsg: state.ResetPassword.errorMsg,
    successMsg: state.ResetPassword.successMsg,
  }));

  useEffect(() => {
    if (successMsg) {
      dispatch(resetFlags());
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
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary"> Reset Password</h5>
                        <p>Create a easy to remember password.</p>
                      </div>
                    </Col>
                    <Col xs={5} className="align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <LogoIcon />
                  <div className="p-2">
                    {errorMsg ? <Alert color="danger">{errorMsg}</Alert> : null}

                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}>
                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <Input
                          name="newPassword"
                          className="form-control"
                          placeholder="Enter new password"
                          type="password"
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
                          <FormFeedback type="invalid">
                            {validation.errors.newPassword}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <SubmitButton isLoading={loading}>Reset</SubmitButton>
                      </div>

                      {/* <div className="mt-4">
                        <button className="btn btn-primary w-md " type="submit">
                          Done
                        </button>
                      </div> */}
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

export default withRouter(ResetPasswordPage);
