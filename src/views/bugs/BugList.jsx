import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Constants from "../../utility/Constants";

class BugList extends Component {
  constructor(props) {
    super(props);
    this.state = { bugDetails: [], bugId: "", bugTitle: "" };
    this.handleChange = this.handleChange.bind(this);
    this.controllerHandleSearch = this.controllerHandleSearch.bind(this);
    this.handleFetchBug = this.handleFetchBug.bind(this);
    this.handleFetchBugs = this.handleFetchBugs.bind(this);
  }
  componentDidMount() {
    fetch(Constants.BUG_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bugDetails: data });
      });
  }
  // Input handle function
  handleChange(event) {
    if (isNaN(event.target.value)) {
      this.setState({ bugTitle: event.target.value });
    } else {
      this.setState({ bugId: event.target.value });
    }
  }
  // Controller for Search (fetch by BugID or BugTitle)
  controllerHandleSearch(event) {
    this.setState({ bugId: "", bugTitle: "" });
    if (this.state.bugId !== "") {
      this.handleFetchBug(event);
    } else {
      this.handleFetchBugs(event);
    }
  }
  // fetch the bug by bug Id
  handleFetchBug(event) {
    document.getElementById("bugSearchInputText").value = "";
    event.preventDefault();
    if (this.state.bugId === "") {
      alert("The Field should not be empty!");
      return;
    }
    fetch(Constants.BUG_URL + parseInt(this.state.bugId))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bugDetails: new Array(data) });
      })
      .catch(() => {
        alert(`The Bug Id,${this.state.bugId} does not exist in our database`);
      });
  }
  // fetch all the bug with same type bugs by bug title
  handleFetchBugs(event) {
    document.getElementById("bugSearchInputText").value = "";
    event.preventDefault();
    if (this.state.bugTitle === "") {
      //   alert("The field should not be Empty!");
      fetch(Constants.BUG_URL)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ bugDetails: data });
        });
      return;
    }
    fetch(Constants.BUG_BY_TITLE_URL + this.state.bugTitle)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bugDetails: data });
      })
      .catch(() => {
        alert(
          `The Bug Title,"${this.state.bugTitle}" does not exist in our database`
        );
      });
  }
  render() {
    return (
      <div className="container-fluid mb-3">
        <div className="row">
          <div className="col-xl-12 mb-3">
            <div class="card">
              <div class="card-header ">
                <div className="form-inline d-flex justify-content-between">
                  <i class="fa fa-bug text-danger" aria-hidden="true">
                    <span className="lead text-danger"> Bug List</span>
                  </i>

                  {/* SEARCH BY Bug Title */}
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Search bug/s"
                        required
                        autoComplete="off"
                        className="form-control shadow-sm"
                        name="bugSearchInputText"
                        id="bugSearchInputText"
                        onChange={this.handleChange}
                      />
                      <div class="input-group-append">
                        <button
                          type="button"
                          name="fetch"
                          className="btn btn-danger"
                          value="Search"
                          onClick={this.controllerHandleSearch}
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                {this.state.bugDetails.map((bug, index) => (
                  <div className="list-group p-1">
                    <Link
                      class="list-group-item list-group-item-action flex-column align-items-start"
                      to={{
                        pathname: `/fetchBugDetailsById`,
                        state: {
                          bugId: bug.bugId,
                        },
                      }}
                    >
                      <div class="d-flex w-100 justify-content-between">
                        <span class="mb-1 font-weight-normal text-info">
                          {bug.issueType === "Bug" ? (
                            <span className="text-danger">
                              {" "}
                              Bug ID #{bug.bugId}
                            </span>
                          ) : (
                            <span className="text-primary">
                              {" "}
                              Bug ID #{bug.bugId}
                            </span>
                          )}
                        </span>
                        <small class="text-secondary font-weight-light">
                          <span className="badge badge-pill badge-light">
                            Created On:{" "}
                          </span>
                          <span className="font-weight-lighter text-secondary">
                            {bug.createdTime}
                          </span>
                        </small>
                      </div>
                      <p class="mb-1 lead text-secondary">{bug.bugTitle}</p>
                      {/* <small>{bug.bugDesc}</small> */}
                    </Link>
                  </div>
                ))}
              </div>
              {/* Start-Footer */}

              {/* End footer */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BugList;
