//import components
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
import DeleteAccountModal from "./delete-account";
import mockData from "./mock-data";
import getColumns from "./table-column";
const WhatsappAccounts = () => {
  //meta title
  // document.title = "Data Tables | Skote - React Admin & Dashboard Template";
  const navigate = useNavigate();

  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);
  const [deletingData, setDeletingData] = useState({});

  const handleAdd = () => {
    navigate("/add-account", {});
  };
  const handleEdit = (data) => {
    console.log(data.original);
    navigate("/add-account", { state: data.original });
  };
  const handleDelete = (data) => {
    setDeletingData(data.original);
    setDisplayDeleteModal(true);
  };
  const columns = getColumns(handleEdit, handleDelete);

  const closeDeleteModal = () => {
    // dispatch(resetFlags());
    setDisplayDeleteModal(false);
  };
  return (
    <React.Fragment>
      <DeleteAccountModal
        isOpen={displayDeleteModal}
        closeModal={closeDeleteModal}
        data={deletingData}
      />
      <div className="page-content">
        <div className="container-fluid">
          <Breadcrumbs title="" breadcrumbItem="Whatsapp Accounts" />
          <TableContainer
            columns={columns}
            data={mockData}
            isGlobalFilter={true}
            isAddOptions={true}
            handleAddOption={handleAdd}
            customPageSize={10}
            theadClass="table-light"
            tableClass="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
            customPageSizeOption={true}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default WhatsappAccounts;
