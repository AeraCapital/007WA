import React from "react";
import { Input } from "reactstrap";

export const Filter = ({ column }) => {
  return <>{column.Filter && <div style={{ marginTop: 5 }}>{column.render("Filter")}</div>}</>;
};

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`search (${length}) ...`}
    />
  );
};
