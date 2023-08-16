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

//redux
import { useDispatch, useSelector } from "react-redux";

import withRouter from "Components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "Components/Common/Breadcrumb";

import { editProfile, resetProfileFlag } from "slices/thunk";

const UserProfile = () => {
  //meta title
  document.title = "Profile | ";

  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => ({
    loading: state.Profile.loading,
    error: state.Profile.error,
    success: state.Profile.success,
  }));

  const { firstName, middleName, lastName } = useSelector((state) => state.Login.user);

  useEffect(() => {
    if (success || error) {
      const resetTimer = setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);

      return () => clearTimeout(resetTimer);
    }
  }, [dispatch, success, error]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      firstName: firstName || "",
      middleName: middleName || "",
      lastName: lastName || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Please Enter Your First Name"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Please Enter Your Last Name"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Settings" breadcrumbItem="Profile" />

          <Row>
            <Col md="6">
              <Card>
                <CardBody>
                  {error ? <Alert color="danger">{error}</Alert> : null}
                  {success ? <Alert color="success">{success}</Alert> : null}
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}>
                    {/* First Name */}
                    <div className="mb-3">
                      <Label className="form-label">First Name</Label>
                      <Input
                        name="firstName"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.firstName || ""}
                        invalid={
                          validation.touched.firstName && validation.errors.firstName ? true : false
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
                    <div className="mt-4">
                      <SubmitButton isLoading={loading}>Update Profile</SubmitButton>
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

export default withRouter(UserProfile);
