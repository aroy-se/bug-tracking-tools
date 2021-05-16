import React from "react";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <input
        type="text"
        className="form-control form-control-sm"
        style={{ height: "18px" }}
        value={filterValue || ""}
        onChange={(event) => setFilter(event.target.value)}
      />
    </span>
  );
};
