import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { fetchKeywordsList } from "slices/thunk";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
import AddKeywordModal from "./add-keyword";
import EditKeywordModal from "./edit-keyword";

const Keywords = () => {
  const [displayAddModal, setDisplayAddModal] = useState(false);
  const [displayEditModal, setDisplayEditModal] = useState(false);

  const [editingData, setEditingData] = useState({});
  const toggleAddModal = () => setDisplayAddModal(true);
  const handleEdit = (data) => {
    setEditingData(data);
    setDisplayEditModal(true);
  };

  const closeAddModal = () => setDisplayAddModal(false);
  const closeEditModal = () => setDisplayEditModal(false);

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
          <td>
            <button type="button" className="btn btn-light btn-sm" onClick={() => handleEdit(row)}>
              Edit
            </button>
          </td>
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
  console.log(data);

  useEffect(() => {
    dispatch(fetchKeywordsList());
  }, [dispatch]);

  //meta title
  document.title = "Data Tables | Dhoon";

  return (
    <React.Fragment>
      <EditKeywordModal isOpen={displayEditModal} closeModal={closeEditModal} data={editingData} />
      <AddKeywordModal isOpen={displayAddModal} closeModal={closeAddModal} />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="Dhoon" breadcrumbItem="Keywords" />
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
