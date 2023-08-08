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

import { addKeyword } from "../../slices/keywords/thunk";

const AddKeywordModal = ({ isOpen, closeModal }) => {
  //meta title
  document.title = "Add Keyword | Dhoon";

  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => ({
    error: state.Keywords.error,
    success: state.Keywords.success,
    loading: state.Keywords.loading,
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
        <ModalHeader toggle={closeModal}>Add Keyword</ModalHeader>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}>
          <ModalBody>
            {error ? <Alert color="danger">{error}</Alert> : null}
            <div className="mb-3">
              <Label className="form-label">Keyword</Label>
              <Input
                name="keyword"
                className="form-control"
                placeholder="Enter keyword"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.keyword || ""}
                invalid={validation.touched.keyword && validation.errors.keyword ? true : false}
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

export default AddKeywordModal;
