import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Constants from "../../utility/Constants";

class BugList extends Component {
  constructor(props) {
    super(props);
    this.state = { bugDetails: [], bugId: "", bugTitle: "" };
    this.handleChange = this.handleChange.bind(this);
    this.fetchDatafromDatabase = this.fetchDatafromDatabase.bind(this);
    this.controllerHandleSearch = this.controllerHandleSearch.bind(this);
    this.handleFetchBug = this.handleFetchBug.bind(this);
    this.handleFetchBugs = this.handleFetchBugs.bind(this);
  }
  //  React Life cycle method
  componentDidMount() {
    const { searchInputText } = this.props.history.location.state;
    var target_url = Constants.BUG_URL;
    var catch_err_msg = "";
    if (searchInputText === "") {
      // Calling whole bug list
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else if (isNaN(searchInputText)) {
      // fetch data by bug title
      target_url = Constants.BUG_BY_TITLE_URL + searchInputText;
      catch_err_msg = searchInputText;
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else {
      // fetch data by bug id
      target_url = Constants.BUG_URL + parseInt(searchInputText);
      catch_err_msg = searchInputText;
      this.fetchDatafromDatabase(target_url, true, catch_err_msg);
    }
  }
  /**
   * To fetch data
   * arg1- var(string):: db url
   * arg2- boolean:: wrap the data inside an array
   * arg3- var(string):: error-catch message
   */
  fetchDatafromDatabase(url, wrapArray, catch_err_msg) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (wrapArray === true) {
          this.setState({ bugDetails: new Array(data) });
        } else {
          this.setState({ bugDetails: data });
        }
      })
      .catch(
        catch_err_msg === ""
          ? (error) => console.log(error)
          : () => {
              alert(
                `The search input, ${catch_err_msg} does not exist in our database`
              );
            }
      );
    return;
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
    var searchInputText = document.getElementById("bugSearchInputText").value;
    event.preventDefault();
    const target_url = Constants.BUG_URL + parseInt(searchInputText);
    const catch_err_msg = searchInputText;
    this.fetchDatafromDatabase(target_url, true, catch_err_msg);
    // reset search-text input
    document.getElementById("bugSearchInputText").value = "";
  }
  // fetch all the bug with same type bugs by bug title
  handleFetchBugs(event) {
    event.preventDefault();
    var searchInputText = document.getElementById("bugSearchInputText").value;
    let target_url = Constants.BUG_URL;
    const catch_err_msg = searchInputText;

    if (searchInputText === "") {
      // Calling whole bug list
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else {
      target_url = Constants.BUG_BY_TITLE_URL + searchInputText;
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    }
    document.getElementById("bugSearchInputText").value = "";
  }
  render() {
    return (
      <div className="container-fluid mt-5 mb-3">
        <div className="row">
          <div className="col-xl-12 mb-3">
            <div class="card">
              <div class="card-header ">
                <div className="form-inline d-flex justify-content-between">
                  <i class="fa fa-bug text-danger" aria-hidden="true">
                    <span className="lead text-danger"> Bug List</span>
                  </i>

                  {/* Bug SEARCH ENGINE */}
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Search bug by bug-id/title"
                        required
                        autoComplete="off"
                        className="form-control shadow-sm"
                        name="bugSearchInputText"
                        id="bugSearchInputText"
                        onChange={this.handleChange}
                        style={{ width: 500 }}
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
                      <div class="d-flex w-100 justify-content-between">
                        <span class="mb-1 lead text-secondary">
                          {bug.bugTitle}
                        </span>
                        <small class="text-secondary font-weight-light">
                          <span className="badge badge-pill badge-light">
                            Created On:{" "}
                          </span>
                          <span className="font-weight-lighter text-secondary">
                            {bug.createdTime}
                          </span>
                        </small>
                        {/* <small>{bug.bugDesc}</small> */}
                      </div>
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
