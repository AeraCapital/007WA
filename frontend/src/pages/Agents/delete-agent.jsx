import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import { deleteAgent } from "slices/thunk";

const DeleteAgentModal = ({ isOpen, closeModal, data }) => {
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => ({
    error: state.Agents.error,
    success: state.Agents.success,
    loading: state.Agents.loading,
  }));

  useEffect(() => {
    if (success) {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, success]);

  const onDeleteClick = () => dispatch(deleteAgent(data.id));
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      tabIndex={-1}
      backdrop="static">
      <div className="modal-content">
        <ModalHeader toggle={closeModal}>Are you Sure ?</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}

          <p className="text-muted font-size-16 mb-4">
            This will delete the Agent <em>{data.firstName}</em> permanently.
          </p>
        </ModalBody>
        <ModalFooter>
          <div className="hstack gap-2 justify-content-center w-md mb-0">
            <button
              type="button"
              className="btn btn-danger"
              onClick={onDeleteClick}
              disabled={loading}>
              {loading && <Spinner size="sm" color="light" className="me-2" />} Delete Now
            </button>
            <button type="button" className="btn btn-secondary w-md" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default DeleteAgentModal;
