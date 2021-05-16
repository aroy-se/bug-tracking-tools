import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
  useColumnOrder,
} from "react-table";
import { COLUMNS } from "./BugDetailsColumns";
import $ from "jquery";
import * as Constants from "../../utility/Constants";
import { GlobalFilter } from "./BugDetailsGlobalFilter";
import { ColumnFilter } from "./BugDetailsColumnFilter";

const FetchBugDetails = () => {
  const [columnSortStatus, setColumnSortStatus] = useState(false);
  const [columnFilterStatus, setColumnFilterStatus] = useState(false);
  const [bugDetails, setBugDetails] = useState([]);
  function fetchBugData() {
    fetch(Constants.BUG_URL)
      .then((response) => response.json())
      .then((data) => {
        setBugDetails(data);
        // console.log("Inner data:    " + data);
        // data.forEach((userData) => {
        setBugDetails((prev) => [...prev, data]);
        // });
      });
    console.log("Outer BugDetails:    " + JSON.stringify(bugDetails));
  }
  function onClickRefresh() {
    fetchBugData();
  }
  useEffect(() => {
    fetchBugData();
  }, []);
  useEffect(() => {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }, []);

  // const columns = useMemo(() => COLUMNS, []);
  // const data = useMemo(() => bugDetails, []);
  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);
  const tableInstance = useTable(
    {
      columns: COLUMNS,
      data: bugDetails,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // footerGroups,
    page, // rows,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;

  const { globalFilter } = state;

  const { pageIndex, pageSize } = state;

  function onChangeColumnFilterCheckbox(event) {
    setColumnFilterStatus(!columnFilterStatus);
  }
  function onChangeColumnSortCheckbox(event) {
    setColumnSortStatus(!columnSortStatus);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12 ">
            <div className="card rounded-0 mb-2 shadow-sm">
              <div className="card-body text-right form-inline d-flex justify-content-between pb-2">
                <GlobalFilter
                  filter={globalFilter}
                  setFilter={setGlobalFilter}
                />
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="columnSortCheckbox"
                    name="columnSortCheckbox"
                    value={columnSortStatus}
                    onChange={onChangeColumnSortCheckbox}
                  />
                  <label
                    class="custom-control-label text-danger"
                    for="columnSortCheckbox"
                  >
                    Column Sort
                  </label>
                </div>
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="columnFilterCheckbox"
                    name="columnFilterCheckbox"
                    value={columnFilterStatus}
                    onChange={onChangeColumnFilterCheckbox}
                  />
                  <label
                    class="custom-control-label text-danger"
                    for="columnFilterCheckbox"
                  >
                    Column Filter
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-sm btn-danger p-0 pl-2 pr-2 shadow"
                  data-toggle="tooltip"
                  data-placement="left"
                  title="Refresh the table data"
                  name="refresh"
                  value="refresh"
                  onClick={onClickRefresh}
                >
                  Refresh{/* <i class="fas fa-redo"></i> */}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mb-2 shadow-sm font-weight-lighter  rounded-0">
              <div className="card-body form-inline d-flex justify-content-between text-center p-1">
                <span className="text-primary">
                  <input type="checkbox" {...getToggleHideAllColumnsProps()} />{" "}
                  Show All Columns
                </span>
                {allColumns.map((column) => (
                  <span key={column.id} className="text-primary">
                    <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
                    {column.Header}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card rounded-0 border-0 mb-2">
              <div className="card-body p-0 ">
                <div className="table-wrapper-scroll-y bug-stat-table-responsive">
                  <table
                    {...getTableProps()}
                    className="table table-sm table-bordered table-hover font-weight-lighter small"
                  >
                    {
                      // ALL true = sort and filter
                      columnSortStatus === true &&
                      columnFilterStatus === true ? (
                        <thead className="thead-light text-center">
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                  {column.render("Header")}
                                  <span>
                                    {" "}
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <i class="fas fa-sort-down"></i>
                                      ) : (
                                        <i class="fas fa-sort-up"></i>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                  <div>
                                    {column.canFilter
                                      ? column.render("Filter")
                                      : null}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                      ) : // Filter true
                      columnFilterStatus === true ? (
                        <thead className="thead-light text-center">
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                  {column.render("Header")}

                                  <div>
                                    {column.canFilter
                                      ? column.render("Filter")
                                      : null}
                                  </div>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                      ) : columnSortStatus === true ? (
                        // column Sort = true
                        <thead className="thead-light text-center">
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th
                                  {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                  )}
                                >
                                  {column.render("Header")}
                                  <span>
                                    {" "}
                                    {column.isSorted ? (
                                      column.isSortedDesc ? (
                                        <i class="fas fa-sort-down"></i>
                                      ) : (
                                        <i class="fas fa-sort-up"></i>
                                      )
                                    ) : (
                                      ""
                                    )}
                                  </span>
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                      ) : (
                        // All false = sort & filter
                        <thead className="thead-light text-center">
                          {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                              {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                  {column.render("Header")}
                                </th>
                              ))}
                            </tr>
                          ))}
                        </thead>
                      )
                    }
                    <tbody {...getTableBodyProps()}>
                      {/* {rows.map((row, i) => { */}
                      {page.map((row, i) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                              return (
                                <td {...cell.getCellProps()}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                    {/* <tfoot className="bg-secondary text-warning font-weight-bold">
                {footerGroups.map((footerGroup) => (
                  <tr {...footerGroup.getFooterGroupProps()}>
                    {footerGroup.headers.map((column) => (
                      <td {...column.getFooterProps}>
                        {column.render("Footer")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot> */}
                  </table>
                </div>
              </div>
            </div>

            <div className="card rounded-0 border-0">
              <div className="card-body p-0 ">
                <div className="form-inline d-flex justify-content-end">
                  <span className="badge badge-pills text-danger ">
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}{" "}
                    </strong>
                  </span>
                  <span className="badge badge-pills text-danger ">
                    | Go to Page:{" "}
                  </span>
                  <input
                    type="number"
                    className="form-control form-control-sm mr-3 border-danger"
                    style={{ height: "8px" }}
                    defaultValue={pageIndex + 1}
                    onChange={(event) => {
                      const pageNumber = event.target.value
                        ? Number(event.target.value) - 1
                        : 0;
                      gotoPage(pageNumber);
                    }}
                    style={{ width: "55px" }}
                  />{" "}
                  <select
                    className="custom-select custom-select-sm mr-3 border-danger"
                    value={pageSize}
                    onChange={(event) =>
                      setPageSize(Number(event.target.value))
                    }
                  >
                    {[10, 25, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show records {pageSize}
                      </option>
                    ))}
                  </select>
                  <div class="btn-group btn-group-sm" role="group">
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      Next
                    </button>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FetchBugDetails;
