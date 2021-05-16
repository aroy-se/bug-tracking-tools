import React, { Component } from "react";
import $ from "jquery";
import * as Constants from "../../utility/Constants";

class FetchBugDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { bugDetails: [] };
    this.fetchBugData = this.fetchBugData.bind(this);
    this.onClickRefresh = this.onClickRefresh.bind(this);
  }
  fetchBugData() {
    fetch(Constants.BUG_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bugDetails: data });
      });
  }
  onClickRefresh() {
    this.fetchBugData();
  }
  componentDidMount() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    this.fetchBugData();
  }
  render() {
    return (
      <div className="container-fluid ">
        <div className="row">
          <div className="col-xl-12 text-right mb-2">
            <button
              type="submit"
              className="btn btn-sm btn-danger p-0 pl-2 pr-2 shadow"
              data-toggle="tooltip"
              data-placement="left"
              title="Refresh the table data"
              name="refresh"
              value="refresh"
              onClick={this.onClickRefresh}
            >
              Refresh{/* <i class="fas fa-redo"></i> */}
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="table-wrapper-scroll-y bug-stat-table-responsive">
              <table className="table table-sm table-bordered table-hover font-weight-lighter text-center small">
                <thead className="thead-light">
                  <tr>
                    <th>BugId</th>
                    <th>Created Time</th>
                    <th>Type</th>
                    <th>Component</th>
                    <th>Reported Version</th>
                    {/* <th>OS</th> */}
                    {/* <th>Issue Sub-type</th> */}
                    {/* <th>Severity</th> */}
                    <th>Regression</th>
                    {/* <th>Browser</th> */}
                    <th>Bug Title</th>
                    {/* <th>Bug Desc</th> */}
                    {/* <th>ReproducibleSteps</th> */}
                    {/* <th>Expected Output</th> */}
                    {/* <th>Actual Output</th> */}
                    {/* <th>Source Code</th> */}
                    {/* <th>Attachment</th> */}
                    {/* <th>Workaround</th> */}
                    <th>Submitter</th>
                    <th>Assignee</th>
                    {/* <th>Submitter Email</th> */}
                    {/* <th>Submitter Company</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.bugDetails.map((bug, index) => (
                    <tr key={index}>
                      <td>{bug.bugId}</td>
                      <td>{bug.createdTime}</td>
                      <td>{bug.issueType}</td>
                      <td>{bug.component}</td>
                      <td>{bug.reportVersion}</td>
                      {/* <td>{bug.os}</td> */}
                      {/* <td>{bug.issueSubType}</td> */}
                      {/* <td>{bug.severity}</td> */}
                      <td>{bug.regressionVersion}</td>
                      {/* <td>{bug.browser}</td> */}
                      <td>{bug.bugTitle}</td>
                      {/* <td>{bug.bugDesc}</td> */}
                      {/* <td>{bug.reproducibleSteps}</td> */}
                      {/* <td>{bug.expectedOutput}</td> */}
                      {/* <td>{bug.actualOutput}</td> */}
                      {/* <td>{bug.sourceCode}</td> */}
                      {/* <td>{bug.attachment}</td> */}
                      {/* <td>{bug.workaround}</td> */}
                      <td>{bug.submitterName}</td>
                      <td>{bug.assignee}</td>
                      {/* <td>{bug.submitterEmail}</td>
                <td>{bug.submitterCompany}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FetchBugDetails;
