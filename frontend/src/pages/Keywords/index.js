import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { fetchKeywordsList } from "slices/thunk";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
import AddKeywordModal from "./add-keyword";
import DeleteKeywordModal from "./delete-keyword";
import EditKeywordModal from "./edit-keyword";

const Keywords = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const [editingData, setEditingData] = useState({});
  const [deletingData, setDeletingData] = useState({});
  const toggleAddModal = () => setDisplayAddModal(true);

  const handleDelete = (data) => {
    setDeletingData(data);
    setDisplayDeleteModal(true);
  };

  const handleEdit = (data) => {
    setEditingData(data);
    setDisplayEditModal(true);
  };

  const closeAddModal = () => setDisplayAddModal(false);
  const closeEditModal = () => setDisplayEditModal(false);
  const closeDeleteModal = () => setDisplayDeleteModal(false);

  const columns = useMemo(
    () => [
      {
        Header: "Keyword",
        accessor: "keyword",
        Filter: false,
        sortType: "basic",
      },
      {
        Header: "Reply",
        accessor: "reply",
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

  const { loading, data, error } = useSelector((state) => ({
    data: state.Keywords.data,
    error: state.Keywords.error,
    loading: state.Keywords.loading,
  }));

  useEffect(() => {
    dispatch(fetchKeywordsList());
  }, [dispatch]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  //meta title
  document.title = "Keywords | ";

  return (
    <React.Fragment>
      <EditKeywordModal isOpen={displayEditModal} closeModal={closeEditModal} data={editingData} />
      <AddKeywordModal isOpen={displayAddModal} closeModal={closeAddModal} />
      <DeleteKeywordModal
        isOpen={displayDeleteModal}
        closeModal={closeDeleteModal}
        data={deletingData}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="" breadcrumbItem="Keywords" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  {!loading && (
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
export default Keywords;
