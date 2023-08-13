import SubmitButton from "Components/submitButton";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import * as Yup from "yup";

import { addAgent } from "../../slices/agents/thunk";

const AddAgentModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => ({
    error: state.Agents.error,
    success: state.Agents.success,
    loading: state.Agents.loading,
  }));

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
    onSubmit: (values) => dispatch(addAgent(values)),
  });

  useEffect(() => {
    // Reset success and error states in Redux store when component unmounts
    if (success) {
      validation.resetForm();
      closeModal();
    }
    // return () => {
    //   console.log("Component unmounting");
    //   dispatch(resetFlags());
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);

  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      tabIndex={-1}
      backdrop="static"
      onClosed={validation.resetForm}>
      <div className="modal-content">
        <ModalHeader toggle={closeModal}>Add Agent</ModalHeader>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}>
          <ModalBody>
            {error ? <Alert color="danger">{error}</Alert> : null}
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
                invalid={validation.touched.firstName && validation.errors.firstName ? true : false}
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
                invalid={validation.touched.lastName && validation.errors.lastName ? true : false}
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
                invalid={validation.touched.email && validation.errors.email ? true : false}
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
                invalid={validation.touched.password && validation.errors.password ? true : false}
              />
              {validation.touched.password && validation.errors.password ? (
                <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
              ) : null}
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="hstack gap-2 justify-content-center mb-0">
              <div className="d-grid">
                <SubmitButton isLoading={loading}>Save</SubmitButton>
              </div>
              <button type="button" className="btn btn-danger w-md" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </ModalFooter>
        </Form>
      </div>
    </Modal>
  );
};

export default AddAgentModal;
