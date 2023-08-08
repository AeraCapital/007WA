import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, Col, Row } from "reactstrap";
import { fetchAgentsList } from "slices/thunk";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
import AddAgentModal from "./add-agent";
import EditAgentModal from "./edit-agent";

const Agents = () => {
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
    data: state.Agents.data,
    error: state.Agents.error,
    loading: state.Agents.loading,
  }));
  console.log(data);

  useEffect(() => {
    dispatch(fetchAgentsList());
  }, [dispatch]);

  //meta title
  document.title = "Agents | ";

  return (
    <React.Fragment>
      <EditAgentModal isOpen={displayEditModal} closeModal={closeEditModal} data={editingData} />
      <AddAgentModal isOpen={displayAddModal} closeModal={closeAddModal} />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="" breadcrumbItem="agents" />
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
export default Agents;
