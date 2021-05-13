import React, { Component } from "react";
import * as Constants from "../../utility/Constants";

class FetchBugDetailsById extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bugData: "",
      bugId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchBug = this.handleFetchBug.bind(this);
  }
  componentDidMount() {
    const { bugId } = this.props.history.location.state;
    fetch(Constants.BUG_URL + parseInt(bugId))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bugData: data });
      })
      .catch(() => {
        console.log("An error found while fetching data from the BugList");
      });
  }
  // Handle function
  handleChange(event) {
    this.setState({ bugId: event.target.value });
  }
  handleFetchBug(event) {
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
        this.setState({ bugData: data });
      })
      .catch(() => {
        alert(`The Bug Id: ${this.state.bugId} does not exist in our database`);
      });
  }
  render() {
    return (
      <div className="container-fluid mt-5">
        {/* End of search bug id box */}
        <div class="row">
          {/* col-1 */}
          {/* Issue resolver info */}
          <div class="col-xl-2 pr-0 pl-1">
            <div class="card shadow">
              <span class="blockquote card-header">
                <i class="fa fa-bug text-danger" aria-hidden="true">
                  <span className="lead text-info"> Bug Resolution Info</span>
                </i>
              </span>
              <div class="card-body">
                <i class="fas fa-user-edit text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary card-title">
                    {" "}
                    Assignee
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  <span class="">{this.state.bugData.assignee}</span>
                </p>
                <i
                  class="far fa-calendar-alt text-secondary"
                  aria-hidden="true"
                >
                  <span className="text-monospace text-secondary card-title">
                    {" "}
                    Created Date
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.createdTime}
                </p>
                <i class="far fa-clock text-secondary" aria-hidden="true">
                  <span className="text-monospace text-secondary card-title">
                    {" "}
                    ETA
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.eta}
                </p>

                <i class="fas fa-code-branch text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary card-title">
                    {" "}
                    Fix Version
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.fixVersion}
                </p>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* col-2 */}
          <div class="col-xl-8">
            <div class="card shadow">
              <div class="card-header text-danger form-inline d-flex justify-content-between">
                <div>
                  <h4 className="bugIdLabel">
                    Bug-ID: #{this.state.bugData.bugId}
                  </h4>
                </div>
                <div className="">
                  {/* SEARCH BY BUG ID */}
                  <div class="form-group">
                    <div class="input-group">
                      <input
                        type="text"
                        placeholder="Search by Bug ID"
                        required
                        autoComplete="off"
                        className="form-control shadow-sm"
                        name="bugIdInputText"
                        onChange={this.handleChange}
                      />
                      <div class="input-group-append">
                        <button
                          type="button"
                          name="fetch"
                          className="btn btn-secondary"
                          value="Search"
                          onClick={this.handleFetchBug}
                        >
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* END of HEADER */}
              <div className="card-body ">
                {/* 1st row */}
                <div className="container-fluid p-0">
                  <div className="row">
                    <div className="col-xl-4 border border-top-0 border-right-0 p-0">
                      <table className="table m-0 p-0">
                        {/* <table className="table table-borderless border m-0 p-0"> */}
                        <tbody>
                          {/* bug-type */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Bug Type
                              </span>
                            </td>
                            <td>
                              {this.state.bugData.issueType === "Bug" ? (
                                <span className="badge badge-danger font-weight-bold">
                                  {/* <i class="fas fa-bug"> */}{" "}
                                  {this.state.bugData.issueType}
                                  {/* </i> */}
                                </span>
                              ) : (
                                <span className="badge badge-primary font-weight-bold">
                                  {/* <i class="fas fa-plus-circle"> */}{" "}
                                  {this.state.bugData.issueType}
                                  {/* </i> */}
                                </span>
                              )}
                            </td>
                          </tr>
                          {/* - Affected Component: Component n Sub-component */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Component
                              </span>
                            </td>
                            <td>
                              <span class="font-weight-light">
                                {this.state.bugData.component}
                              </span>
                            </td>
                          </tr>
                          {/* - Reporting version (On issue version issue is occurring) */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Reporting Version
                              </span>
                            </td>
                            <td>
                              <span class="font-weight-light">
                                {this.state.bugData.reportVersion}
                              </span>
                            </td>
                          </tr>
                          {/* - OS: Win/Mac/Lin */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Operating System
                              </span>
                            </td>
                            <td>
                              {this.state.bugData.os === "MacOS" ? (
                                <i class="fab fa-apple text-secondary">
                                  {" "}
                                  {this.state.bugData.os}
                                </i>
                              ) : this.state.bugData.os === "Windows" ? (
                                <i class="fab fa-windows text-secondary">
                                  {" "}
                                  {this.state.bugData.os}
                                </i>
                              ) : this.state.bugData.os === "Linux" ? (
                                <i class="fab fa-ubuntu text-secondary">
                                  {" "}
                                  {this.state.bugData.os}
                                </i>
                              ) : (
                                // Others
                                <i class="fas fa-desktop text-secondary">
                                  {" "}
                                  {this.state.bugData.os}
                                </i>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* 2nd col */}
                    <div class="col-xl-4 border border-top-0 p-0">
                      {/* <table class="table table-borderless"> */}
                      <table className="table m-0 p-0">
                        <tbody>
                          {/* Bug-sub-type: Crash/Others */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Bug Sub-Type
                              </span>
                            </td>
                            <td>
                              {this.state.bugData.issueSubType === "Crash" ? (
                                <span className="badge badge-danger font-weight-bold">
                                  {this.state.bugData.issueSubType}
                                </span>
                              ) : (
                                <span className="badge badge-info font-weight-bold">
                                  {this.state.bugData.issueSubType}
                                </span>
                              )}
                            </td>
                          </tr>
                          {/* Sub-component */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Sub-Component
                              </span>
                            </td>
                            <td>
                              {/* <label>{this.state.bugData.subComponent}</label> */}
                              <span class="font-weight-light">NA</span>
                            </td>
                          </tr>
                          {/* - Reporting version (On issue version issue is occurring) */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Regression Version
                              </span>
                            </td>
                            <td>
                              <span class="font-weight-light">
                                {this.state.bugData.regressionVersion}
                              </span>
                            </td>
                          </tr>
                          {/* Browser : Google Chrome/Mozilla Firefox/Microsoft Edge/Apple Safari */}
                          <tr>
                            <td>
                              <span className="badge badge-light">Browser</span>
                            </td>
                            <td>
                              {this.state.bugData.browser ===
                              "Google Chrome" ? (
                                <i class="fab fa-chrome text-secondary">
                                  {" "}
                                  {this.state.bugData.browser}
                                </i>
                              ) : this.state.bugData.browser ===
                                "Mozilla Firefox" ? (
                                <i class="fab fa-firefox-browser text-secondary">
                                  {" "}
                                  {this.state.bugData.browser}
                                </i>
                              ) : this.state.bugData.browser ===
                                "Apple Safari" ? (
                                <i class="fab fa-safari text-secondary">
                                  {" "}
                                  {this.state.bugData.browser}
                                </i>
                              ) : this.state.bugData.browser ===
                                "Microsoft Edge" ? (
                                <i class="fab fa-edge text-secondary">
                                  {" "}
                                  {this.state.bugData.browser}
                                </i>
                              ) : (
                                // Other browsers
                                <i class="far fa-window-restore text-secondary">
                                  {" "}
                                  {this.state.bugData.browser}
                                </i>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* 3rd col */}
                    <div className="col-xl-4 border border-top-0 border-left-0 p-0">
                      <table className="table m-0 p-0">
                        <tbody>
                          {/* Severity : Rarely/Intermittently/Always */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Severity
                              </span>
                            </td>
                            <td>
                              {this.state.bugData.severity === "Rarely" ? (
                                <span class="badge badge-info text-light">
                                  {" "}
                                  {this.state.bugData.severity}
                                </span>
                              ) : this.state.bugData.severity ===
                                "Intermittently" ? (
                                <span class="badge badge-warning text-primary">
                                  {" "}
                                  {this.state.bugData.severity}
                                </span>
                              ) : (
                                //"Always"
                                <span class="badge badge-warning text-danger">
                                  {" "}
                                  {this.state.bugData.severity}
                                </span>
                              )}
                            </td>
                          </tr>
                          {/* Bug-state: New/WIP/TIP/Fixed/Rejected/Duplicate */}
                          <tr>
                            <td>
                              <span className="badge badge-light">State</span>
                            </td>
                            <td>
                              {this.state.bugData.state === "New" ? (
                                <span class="badge badge-primary text-light font-weight-bold">
                                  {" "}
                                  {this.state.bugData.state}
                                </span>
                              ) : this.state.bugData.state ===
                                "Work-In-Progress" ? (
                                <span class="badge badge-warning text-dark font-weight-bold">
                                  {" "}
                                  {this.state.bugData.state}
                                </span>
                              ) : this.state.bugData.state ===
                                "Testing-In-Progress" ? (
                                <span class="badge badge-success text-danger font-weight-bold">
                                  {" "}
                                  {this.state.bugData.state}
                                </span>
                              ) : this.state.bugData.state === "Fixed" ? (
                                <span class="badge badge-success text-light font-weight-bold">
                                  {" "}
                                  {this.state.bugData.state}
                                </span>
                              ) : this.state.bugData.state === "Rejected" ? (
                                <span class="badge badge-dark text-light font-weight-bold">
                                  {" "}
                                  <s>{this.state.bugData.state}</s>
                                </span>
                              ) : (
                                // Duplicate
                                <span class="badge badge-secondary text-warning font-weight-bold">
                                  {" "}
                                  {this.state.bugData.state}
                                </span>
                              )}
                            </td>
                          </tr>
                          {/* - Bug status: Unresolved/Assigned/Open/Reopen/Closed */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Resolution
                              </span>
                            </td>
                            <td>
                              {this.state.bugData.resolution ===
                              "Unresolved" ? (
                                <span class="badge badge-secondary text-light font-weight-bold">
                                  {" "}
                                  {this.state.bugData.resolution}
                                </span>
                              ) : this.state.bugData.resolution ===
                                "Assigned" ? (
                                <span class="badge badge-secondary text-danger font-weight-bold">
                                  {" "}
                                  {this.state.bugData.resolution}
                                </span>
                              ) : this.state.bugData.resolution === "Open" ? (
                                <span class="badge badge-info text-light font-weight-bold">
                                  {" "}
                                  {this.state.bugData.resolution}
                                </span>
                              ) : this.state.bugData.resolution === "Reopen" ? (
                                <span class="badge badge-primary text-danger font-weight-bold">
                                  {" "}
                                  {this.state.bugData.resolution}
                                </span>
                              ) : (
                                // Closed
                                <span class="badge badge-danger text-light font-weight-bold">
                                  {" "}
                                  <s>{this.state.bugData.resolution}</s>
                                </span>
                              )}
                            </td>
                          </tr>
                          {/* - Priority */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Priority
                              </span>
                            </td>
                            <td>
                              {/* <span class="font-weight-light">P4-Normal</span> */}
                              {this.state.bugData.priority === "P4-Low" ? (
                                <span class="badge badge-primary font-weight-bold">
                                  {" "}
                                  {this.state.bugData.priority}
                                </span>
                              ) : this.state.bugData.priority ===
                                "P3-Medium" ? (
                                <span class="badge badge-info font-weight-bold">
                                  {" "}
                                  {this.state.bugData.priority}
                                </span>
                              ) : this.state.bugData.priority === "P2-High" ? (
                                <span class="badge badge-warning font-weight-bold">
                                  {" "}
                                  {this.state.bugData.priority}
                                </span>
                              ) : this.state.bugData.priority ===
                                "P1-Critical" ? (
                                <span class="badge badge-danger font-weight-bold">
                                  {" "}
                                  {this.state.bugData.priority}
                                </span>
                              ) : (
                                <span class="badge badge-secondary font-weight-bold">
                                  {" "}
                                  {this.state.bugData.priority}
                                </span>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* end of col-3 */}
                  </div>
                  <div className="row">
                    <div className="col-xl-12 border mt-2">
                      <div className="row">
                        <div className="col-xl-3 pt-1 pb-2 pl-1">
                          <span className="badge badge-light text-danger">
                            Duplicate/Similar Bug/s:
                          </span>
                        </div>
                        <div className="col-xl-9 pt-1">
                          <label class="">
                            {this.state.bugData.duplicateBugIds}
                          </label>
                          {/* <label class="">{this.state.bugData.duplicateBugs}</label> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Start Bug input details */}
                {/* 1st row */}
                <div class="container-fluid pl-0 pr-0 mt-2">
                  <div class="row">
                    <div class="col-xl-12 pl-0 pr-0">
                      {/* <table class="table table-borderless "> */}
                      <table class="table border pl-0 pr-0">
                        <tbody>
                          {/* Title/Summary/Synopsis */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Bug Title</span>
                                </h6>
                                <label class="font-weight-light">
                                  {this.state.bugData.bugTitle}
                                </label>
                              </div>
                            </td>
                          </tr>
                          {/* Description - More Info */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Bug Description</span>
                                </h6>
                                <span class="font-weight-light">
                                  {this.state.bugData.bugDesc}
                                </span>
                              </div>
                            </td>
                          </tr>
                          {/* Reproducible Steps */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Reproducible Steps</span>
                                </h6>
                                <span class="font-weight-light">
                                  {/* <pre> */}
                                  {this.state.bugData.reproducibleSteps}
                                  {/* </pre> */}
                                </span>
                              </div>
                            </td>
                          </tr>
                          {/* Expected Output */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Expected Output</span>
                                </h6>
                                <span class="font-weight-light">
                                  {this.state.bugData.expectedOutput}
                                </span>
                              </div>
                            </td>
                          </tr>
                          {/* Actual Output */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Actual Output</span>
                                </h6>
                                <span class="font-weight-light">
                                  {this.state.bugData.actualOutput}
                                </span>
                              </div>
                            </td>
                          </tr>
                          {/* Source code/test case/stack trace content (Optional) */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">
                                    Source code / Test case / Stacktrace
                                  </span>
                                </h6>
                                <span class="font-weight-light">
                                  <code>{this.state.bugData.sourceCode}</code>
                                </span>
                              </div>
                            </td>
                          </tr>
                          {/* Workaround */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Workaround</span>
                                </h6>
                                <span class="font-weight-light">
                                  {this.state.bugData.workaround}
                                </span>
                              </div>
                            </td>
                          </tr>
                          {/* Workaround */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6 class="">
                                  <span class="">Comments</span>
                                </h6>
                                <span class="font-weight-light">
                                  {this.state.bugData.comments === ""
                                    ? this.state.bugData.comments
                                    : "No Comments"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* Add Comment */}
                  <div className="row ">
                    <div className="col-xl-12 p-0">
                      <div class="card ">
                        <div class="card-header p-1 text-info">
                          <i class="fa fa-comments" aria-hidden="true">
                            <span> Add Comment</span>
                          </i>
                        </div>
                        <div class="card-body p-1">
                          <div class="form-group mb-1">
                            <textarea
                              type="textarea"
                              className="form-control pb-0"
                              name="comment"
                              // value={input.comment}
                              // onChange={this.handleChange}
                              placeholder="Post your comments here..."
                            />
                          </div>
                          <div class="form-group m-0 ">
                            <button
                              type="submit"
                              class="btn btn-sm btn-outline-info"
                            >
                              Add Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Bug input details */}
              </div>
            </div>
          </div>
          {/* col-3 */}
          {/* Submitter info */}
          <div class="col-xl-2 pl-0 pr-1">
            <div class="card shadow">
              <span class="blockquote card-header text-info">
                Submitter Info
              </span>
              <div class="card-body">
                <i class="far fa-user text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Submitter Name
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.submitterName}
                </p>
                <i class="fas fa-at text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Submitter Email-ID
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.submitterEmail}
                </p>
                <i class="far fa-building text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Company
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.submitterCompany}
                </p>
                <i class="fas fa-paperclip text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Attachment
                  </span>
                </i>
                <p class="card-text alert alert-secondary p-1" role="alert">
                  {this.state.bugData.attachment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FetchBugDetailsById;
