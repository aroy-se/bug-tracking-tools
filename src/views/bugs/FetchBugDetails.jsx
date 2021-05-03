import React, { Component } from "react";
import * as Constants from "../../utility/Constants";

class FetchBugDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { bugDetails: [] };
  }
  componentDidMount() {
    fetch(Constants.BUG_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ bugDetails: data });
      });
  }
  render() {
    return (
      <div className="container-fluid ">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Bug-ID</th>
              <th>Created Time</th>
              <th>Issue Type</th>
              <th>Component</th>
              <th>Report Version</th>
              {/* <th>OS</th> */}
              {/* <th>Issue Sub-type</th> */}
              {/* <th>Severity</th> */}
              <th>Regression Version</th>
              {/* <th>Browser</th> */}
              <th>Bug Title</th>
              {/* <th>Bug Desc</th> */}
              {/* <th>ReproducibleSteps</th> */}
              {/* <th>Expected Output</th> */}
              {/* <th>Actual Output</th> */}
              {/* <th>Source Code</th> */}
              {/* <th>Attachment</th> */}
              {/* <th>Workaround</th> */}
              <th>Submitter Name</th>
              <th>Submitter Email</th>
              <th>Submitter Company</th>
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
                <td>{bug.submitterEmail}</td>
                <td>{bug.submitterCompany}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FetchBugDetails;