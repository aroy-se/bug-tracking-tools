import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  }, 1000);
  return (
    <span>
      <h5>
        <span className="badge badge-light text-danger">Global Search: </span>{" "}
        <input
          className="form-control form-control-sm shadow-sm rounded-0"
          style={{ width: "900px" }}
          value={value || ""}
          onChange={(event) => {
            setValue(event.target.value);
            onChange(event.target.value);
          }}
        />
      </h5>
    </span>
  );
};
