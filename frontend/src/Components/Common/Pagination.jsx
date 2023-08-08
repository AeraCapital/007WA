import React from "react";
import { PaginationItem, PaginationLink, Row } from "reactstrap";

const Pagination = ({ currentPage, handleClick, handlenextPage, handleprevPage, pageNumbers }) => {
  console.log(currentPage);
  return (
    <Row
      className="justify-content-between align-items-center mb-3"
      id="pagination-element"
      style={{ display: "flex" }}>
      <div className="clo-auto">
        <ul className="pagination pagination-rectangle justify-content-end mb-2">
          {currentPage < 1 ? (
            <PaginationItem>
              <PaginationLink href="#" previous></PaginationLink>
            </PaginationItem>
          ) : (
            <PaginationItem>
              <PaginationLink href="#" previous onClick={() => handleprevPage()}></PaginationLink>
            </PaginationItem>
          )}

          {(pageNumbers || []).map((item, key) => (
            <PaginationItem className={currentPage === item ? "active " : ""} key={key}>
              <PaginationLink href="#" key={key} id={item} onClick={() => handleClick(item)}>
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationLink href="#" next onClick={() => handlenextPage()}></PaginationLink>
          </PaginationItem>
        </ul>
      </div>
    </Row>
  );
};

export default Pagination;
