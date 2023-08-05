import Pagination from "Components/Common/Pagination";
import { useEffect, useMemo, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import TableContainer from "../../Components/Common/TableContainer";
// import data from "./mock-data";
import { useDispatch, useSelector } from "react-redux";
import { fetchKeywordsList } from "slices/thunk";

const Keyboards = () => {
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
      // {
      //   Header: "Action",
      //   accessor: () => (
      //     <td>
      //       <button type="button" className="btn btn-light btn-sm">
      //         Edit
      //       </button>
      //     </td>
      //   ),
      //   Filter: false,
      //   disableSortBy: true,
      // },
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

  //meta title
  document.title = "Data Tables | Dhoon";

  const [currentpages, setCurrentpages] = useState(data);

  console.log("rendering", data);
  return (
    <div className="page-content">
      <div className="container-fluid">
        <Breadcrumbs title="Dhoon" breadcrumbItem="Keywords" />
        <Row>
          <Col lg={8}>
            <Card>
              <CardBody>
                {!loading && (
                  <TableContainer
                    columns={columns}
                    data={currentpages}
                    isGlobalFilter={false}
                    isAddOptions={false}
                    customPageSize={10}
                    theadClass="table-light"
                    tableClass="table table-bordered dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                    handleUserClick={() => console.log("hihi")}
                  />
                )}
                {!loading && (
                  <Pagination
                    perPageData={10}
                    data={data}
                    setCurrentpages={setCurrentpages}
                    currentpages={currentpages}
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Keyboards;
