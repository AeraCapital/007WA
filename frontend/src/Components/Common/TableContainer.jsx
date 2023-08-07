import React, { Fragment } from "react";
import {
  useAsyncDebounce,
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { Button, Col, Row, Table } from "reactstrap";
import Pagination from "./Pagination";
import { DefaultColumnFilter, Filter } from "./filters";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  isJobListGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <React.Fragment>
      <Col md={4}>
        <div className="search-box me-xxl-2 my-3 my-xxl-0 d-inline-block">
          <div className="position-relative">
            <label htmlFor="search-bar-0" className="search-label">
              <span id="search-bar-0-label" className="sr-only">
                Search this table
              </span>
              <input
                onChange={(e) => {
                  setValue(e.target.value);
                  onChange(e.target.value);
                }}
                id="search-bar-0"
                type="text"
                className="form-control"
                placeholder={`${count} records...`}
                value={value || ""}
              />
            </label>
            <i className="bx bx-search-alt search-icon"></i>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
}

const TableContainer = ({
  columns,
  data,
  isAddOptions,
  handleAddOption,
  customPageSize,
  tableClass,
  theadClass,
  customPageSizeOption,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setPageSize,
    state,
    nextPage,
    previousPage,
    pageOptions,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: {
        pageIndex: 0,
        pageSize: customPageSize,
        sortBy: [
          {
            desc: true,
          },
        ],
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data?.length / customPageSize); i++) {
    pageNumbers.push(i);
  }

  const generateSortingIndicator = (column) => {
    return column.isSorted ? column.isSortedDesc ? <span>&#9650;</span> : <span>&#9660;</span> : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  return (
    <Fragment>
      <Row className="mb-2">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {isAddOptions && (
          <Col sm="8">
            <div className="text-sm-end ">
              <Button
                type="button"
                color="primary"
                className="mb-2 me-2 w-md"
                onClick={handleAddOption}>
                <i className="mdi mdi-plus me-1" />
                Add New
              </Button>
            </div>
          </Col>
        )}
      </Row>

      <div className="table-responsive">
        <Table hover {...getTableProps()} className={tableClass}>
          <thead className={theadClass}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} className={`${column.isSortable ? "sorting_asc" : ""}`}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </div>
                    <Filter column={column} />
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Fragment key={row.getRowProps().key}>
                  <tr>
                    {row.cells.map((cell) => {
                      return (
                        <td key={cell.id} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
      </div>
      {pageOptions.length ? (
        <Row className="mb-2">
          {customPageSizeOption && (
            <Col md={2}>
              <select className="form-select" value={pageSize} onChange={onChangeInSelect}>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </Col>
          )}
          <Col md={10}>
            <Pagination
              currentPage={state.pageIndex}
              handleClick={gotoPage}
              handlenextPage={nextPage}
              handleprevPage={previousPage}
              pageNumbers={pageOptions}
            />
          </Col>
        </Row>
      ) : (
        <div id="noresult">
          <div className="text-center py-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light text-primary rounded-circle fs-4xl">
                <i className="bi bi-search"></i>
              </div>
            </div>
            <h5 className="mt-2">Sorry! No Result Found</h5>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TableContainer;
