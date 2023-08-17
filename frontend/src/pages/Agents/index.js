import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Card, CardBody, Col, Row, Spinner } from "reactstrap";
import { resetFlags } from "slices/agents/reducer";
import { fetchAgentsList } from "slices/thunk";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
import AddAgentModal from "./add-agent";
import DeleteAgentModal from "./delete-agent";
import EditAgentModal from "./edit-agent";

const Agents = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const [editingData, setEditingData] = useState({});
  const [deletingData, setDeletingData] = useState({});
  const toggleAddModal = () => setDisplayAddModal(true);

  const handleEdit = (data) => {
    setEditingData(data);
    setDisplayEditModal(true);
  };

  const handleDelete = (data) => {
    setDeletingData(data);
    setDisplayDeleteModal(true);
  };

  const closeAddModal = () => {
    dispatch(resetFlags());
    setDisplayAddModal(false);
  };
  const closeEditModal = () => {
    dispatch(resetFlags());
    setDisplayEditModal(false);
  };
  const closeDeleteModal = () => {
    dispatch(resetFlags());
    setDisplayDeleteModal(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        Filter: false,
        sortType: "basic",
      },
      {
        Header: "Middle Name",
        accessor: "middleName",
        Filter: false,
        disableSortBy: true,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        Filter: false,
        sortType: "basic",
      },
      {
        Header: "Email",
        accessor: "email",
        Filter: false,
        disableSortBy: true,
      },
      {
        Header: "Action",
        accessor: (row) => (
          <>
            <button
              type="button"
              className="btn btn-light btn-sm mx-1" // Apply horizontal margin when stacked
              onClick={() => handleEdit(row)}>
              <i className="bx bx-edit-alt p-1"></i>
              Edit
            </button>

            <button
              type="button"
              className="btn btn-light btn-sm mx-1" // Apply horizontal margin when stacked
              onClick={() => handleDelete(row)}>
              <i className="bx bx-trash p-1"></i> Delete
            </button>
          </>
        ),
        Filter: false,
        disableSortBy: true,
      },
    ],
    []
  );
  const dispatch = useDispatch();

  const { fetching, data, fetchError } = useSelector((state) => ({
    data: state.Agents.data,
    fetchError: state.Agents.fetchError,
    fetching: state.Agents.fetching,
  }));

  useEffect(() => {
    if (data.length === 0) {
      dispatch(fetchAgentsList());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  //meta title
  document.title = "Agents | ";

  return (
    <React.Fragment>
      <EditAgentModal isOpen={displayEditModal} closeModal={closeEditModal} data={editingData} />
      <DeleteAgentModal
        isOpen={displayDeleteModal}
        closeModal={closeDeleteModal}
        data={deletingData}
      />
      <AddAgentModal isOpen={displayAddModal} closeModal={closeAddModal} />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="" breadcrumbItem="agents" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  {fetching && (
                    <div>
                      <Spinner size="sm" color="light" className="me-2" />
                      Fetching Data...
                    </div>
                  )}
                  {fetchError && <Alert color="danger">{fetchError}</Alert>}

                  {!(fetching || fetchError) && (
                    <TableContainer
                      columns={columns}
                      data={data}
                      isGlobalFilter={true}
                      isAddOptions={true}
                      handleAddOption={toggleAddModal}
                      customPageSize={10}
                      theadClass="table-light"
                      tableClass="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      customPageSizeOption={true}
                    />
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Agents;
