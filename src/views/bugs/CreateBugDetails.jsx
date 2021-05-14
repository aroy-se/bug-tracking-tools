import React from "react";
import * as Constants from "../../utility/Constants";
import bug_img from "../../assets/images/bug64.jpg";
import { getFromStorage } from "../../utility/storage";
import Login from "../common/Login";

class CreateBugDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportError: "",
      reportSuccess: "",

      issueType: "Bug",
      component: "",
      reportVersion: "",
      os: "",
      issueSubType: "Others",
      severity: "",
      regressionVersion: "",
      browser: "",

      bugTitle: "",
      bugDesc: "",
      reproducibleSteps: "",
      expectedOutput: "",
      actualOutput: "",
      sourceCode: "",
      attachment: "",
      workaround: "",

      submitterName: "",
      submitterEmail: "",
      submitterCompany: "",

      componentDetails: [],

      acceptCheckbox: true,
    };
    this.onChangeIssueType = this.onChangeIssueType.bind(this);
    this.onChangeComponent = this.onChangeComponent.bind(this);
    this.onChangeReportVersion = this.onChangeReportVersion.bind(this);
    this.onChangeOs = this.onChangeOs.bind(this);
    this.onChangeIssueSubType = this.onChangeIssueSubType.bind(this);
    this.onChangeSeverity = this.onChangeSeverity.bind(this);
    this.onChangeRegressionVersion = this.onChangeRegressionVersion.bind(this);
    this.onChangeBrowser = this.onChangeBrowser.bind(this);
    this.onChangeBugTitle = this.onChangeBugTitle.bind(this);
    this.onChangeBugDesc = this.onChangeBugDesc.bind(this);
    this.onChangeReproducibleSteps = this.onChangeReproducibleSteps.bind(this);
    this.onChangeExpectedOutput = this.onChangeExpectedOutput.bind(this);
    this.onChangeActualOutput = this.onChangeActualOutput.bind(this);
    this.onChangeSourceCode = this.onChangeSourceCode.bind(this);
    this.onChangeAttachment = this.onChangeAttachment.bind(this);
    this.onChangeWorkaround = this.onChangeWorkaround.bind(this);
    this.onChangeSubmitterName = this.onChangeSubmitterName.bind(this);
    this.onChangeSubmitterEmail = this.onChangeSubmitterEmail.bind(this);
    this.onChangeSubmitterCompany = this.onChangeSubmitterCompany.bind(this);

    this.onClickCreateBugReport = this.onClickCreateBugReport.bind(this);
    this.onClickFetchComponents = this.onClickFetchComponents.bind(this);

    this.onChangeAcceptCheckbox = this.onChangeAcceptCheckbox.bind(this);
  }
  onChangeAcceptCheckbox(event) {
    this.setState({
      acceptCheckbox: !this.state.acceptCheckbox,
    });
  }
  onChangeIssueType(event) {
    this.setState({
      issueType: event.target.value,
    });
  }
  onChangeComponent(event) {
    this.setState({
      component: event.target.value,
    });
  }
  onChangeReportVersion(event) {
    this.setState({
      reportVersion: event.target.value,
    });
  }
  onChangeOs(event) {
    this.setState({
      os: event.target.value,
    });
  }
  onChangeIssueSubType(event) {
    this.setState({
      issueSubType: event.target.value,
    });
  }
  onChangeSeverity(event) {
    this.setState({
      severity: event.target.value,
    });
  }
  onChangeRegressionVersion(event) {
    this.setState({
      regressionVersion: event.target.value,
    });
  }
  onChangeBrowser(event) {
    this.setState({
      browser: event.target.value,
    });
  }
  onChangeBugTitle(event) {
    this.setState({
      bugTitle: event.target.value,
    });
  }
  onChangeBugDesc(event) {
    this.setState({
      bugDesc: event.target.value,
    });
  }
  onChangeReproducibleSteps(event) {
    this.setState({
      reproducibleSteps: event.target.value,
    });
  }
  onChangeExpectedOutput(event) {
    this.setState({
      expectedOutput: event.target.value,
    });
  }
  onChangeActualOutput(event) {
    this.setState({
      actualOutput: event.target.value,
    });
  }
  onChangeSourceCode(event) {
    this.setState({
      sourceCode: event.target.value,
    });
  }
  onChangeAttachment(event) {
    this.setState({
      attachment: event.target.value,
    });
  }
  onChangeWorkaround(event) {
    this.setState({
      workaround: event.target.value,
    });
  }
  onChangeSubmitterName(event) {
    this.setState({
      submitterName: event.target.value,
    });
  }
  onChangeSubmitterEmail(event) {
    this.setState({
      submitterEmail: event.target.value,
    });
  }
  onChangeSubmitterCompany(event) {
    this.setState({
      submitterCompany: event.target.value,
    });
  }
  onClickCreateBugReport(event) {
    event.preventDefault();
    const {
      issueType,
      component,
      reportVersion,
      os,
      issueSubType,
      severity,
      regressionVersion,
      browser,

      bugTitle,
      bugDesc,
      reproducibleSteps,
      expectedOutput,
      actualOutput,
      sourceCode,
      attachment,
      workaround,

      submitterName,
      submitterEmail,
      submitterCompany,
    } = this.state;

    // Post request to backend
    fetch(Constants.BUG_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        issueType: issueType,
        component: component,
        reportVersion: reportVersion,
        os: os,
        issueSubType: issueSubType,
        severity: severity,
        regressionVersion: regressionVersion,
        browser: browser,

        bugTitle: bugTitle,
        bugDesc: bugDesc,
        reproducibleSteps: reproducibleSteps,
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
        sourceCode: sourceCode,
        attachment: attachment,
        workaround: workaround,

        submitterName: submitterName,
        submitterEmail: submitterEmail,
        submitterCompany: submitterCompany,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          // reset bug fields
          this.setState({
            reportError: "",
            reportSuccess: json.message,
            issueType: "Bug",
            component: "",
            reportVersion: "",
            os: "",
            issueSubType: "Others",
            severity: "",
            regressionVersion: "",
            browser: "",

            bugTitle: "",
            bugDesc: "",
            reproducibleSteps: "",
            expectedOutput: "",
            actualOutput: "",
            sourceCode: "",
            attachment: "",
            workaround: "",

            submitterName: "",
            submitterEmail: "",
            submitterCompany: "",
          });
        } else {
          this.setState({
            reportSuccess: "",
            reportError: json.message,
          });
        }
      });
  }

  // To fetch all the components from the database
  onClickFetchComponents(event) {
    // event.preventDefault();
    console.log(Constants.COMPONENT_URL);
    fetch(Constants.COMPONENT_URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ componentDetails: data });
      })
      .catch(() => {
        alert(`A problem occurred while fetching all the component names`);
      });
  }
  render() {
    const btt_local_storage_token = getFromStorage("btt_local_storage");
    if (btt_local_storage_token && btt_local_storage_token.token) {
      const {
        reportSuccess,
        reportError,
        issueType,
        component,
        reportVersion,
        os,
        issueSubType,
        severity,
        regressionVersion,
        browser,

        bugTitle,
        bugDesc,
        reproducibleSteps,
        expectedOutput,
        actualOutput,
        sourceCode,
        attachment,
        workaround,

        submitterName,
        submitterEmail,
        submitterCompany,
        componentDetails,
      } = this.state;
      return (
        <div className="container p-0 pt-5">
          <div class="row">
            <div class="col-xl-12 p-0 mb-5">
              <div class="card shadow">
                <div class="card-header text-danger form-inline d-flex justify-content-between shadow-sm">
                  <h4>REPORT A BUG</h4>
                  <img
                    src={bug_img}
                    alt="bug-img"
                    style={{ width: 35, height: 35 }}
                  />
                </div>
                <div className="card-body">
                  {/* 1st row */}
                  <div className="container-fluid p-0">
                    <div className="row">
                      <div className="col-xl-6 p-0">
                        <table className="table table-borderless">
                          <tbody>
                            {/* bug-type */}
                            <tr>
                              <td>
                                <h6>
                                  <i class="lead font-weight-bold text-danger">
                                    *
                                  </i>{" "}
                                  Issue Type
                                </h6>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  name="issueType"
                                  id="issueType1"
                                  className="m-2"
                                  value="Bug"
                                  onChange={this.onChangeIssueType}
                                  defaultChecked
                                />
                                <label for="issueType1">Bug</label>
                                <input
                                  type="radio"
                                  name="issueType"
                                  id="issueType2"
                                  className="m-2"
                                  value="Enhancement"
                                  onChange={this.onChangeIssueType}
                                />
                                <label for="issueType2">Enhancement</label>
                              </td>
                            </tr>
                            {/* - Affected Component: Component n Sub-component */}
                            <tr>
                              <td>
                                <h6>
                                  <i class="lead font-weight-bold text-danger">
                                    *
                                  </i>{" "}
                                  Component
                                </h6>
                              </td>
                              <td>
                                <select
                                  className="custom-select shadow-sm form-control"
                                  name="component"
                                  value={component}
                                  onChange={this.onChangeComponent}
                                  // value={componentDetails.componentName}
                                  onClick={this.onClickFetchComponents}
                                >
                                  <option selected>Select Any Component</option>
                                  {componentDetails.map((component, index) => (
                                    <option key={index}>
                                      {component.componentName}
                                    </option>
                                  ))}
                                  {/* <option>Component-1</option>
                                <option>Component-2</option>
                                <option>Component-3</option>
                                <option>BTT-Authentication</option>
                                <option>BTT-Bugs</option>
                                <option>BTT-Users</option> */}
                                </select>
                              </td>
                            </tr>
                            {/* - Reporting version (On issue version issue is occurring) */}
                            <tr>
                              <td>
                                <h6>
                                  <i class="lead font-weight-bold text-danger">
                                    *
                                  </i>{" "}
                                  Reporting Version
                                </h6>
                              </td>
                              <td>
                                <select
                                  className="custom-select shadow-sm form-control"
                                  name="reportVersion"
                                  value={reportVersion}
                                  onChange={this.onChangeReportVersion}
                                >
                                  <option selected>
                                    Select Reporting Version
                                  </option>
                                  <option>BTT-v2020.03</option>
                                  <option>BTT-v2020.06</option>
                                  <option>BTT-v2020.09</option>
                                  <option>BTT-v2020.12</option>
                                  <option>BTT-v2021.03</option>
                                  <option>NA</option>
                                </select>
                              </td>
                            </tr>
                            {/* - OS: Win/Mac/Lin */}
                            <tr>
                              <td>
                                <h6>Operating System</h6>
                              </td>
                              <td>
                                <select
                                  class="custom-select shadow-sm form-control"
                                  name="os"
                                  value={os}
                                  onChange={this.onChangeOs}
                                >
                                  <option selected>
                                    Select Operating System
                                  </option>
                                  <option>Windows</option>
                                  <option>MacOS</option>
                                  <option>Linux</option>
                                  <option>Others</option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      {/* 2nd row */}
                      <div class="col-xl-6 p-0">
                        <table class="table table-borderless">
                          <tbody>
                            {/* Bug-sub-type */}
                            <tr>
                              <td>
                                <h6>
                                  <i class="lead font-weight-bold text-danger">
                                    *
                                  </i>{" "}
                                  Issue Sub-Type
                                </h6>
                              </td>
                              <td>
                                <input
                                  type="radio"
                                  name="issueSubType"
                                  id="issueSubType1"
                                  className="m-2"
                                  value="Crash"
                                  onChange={this.onChangeIssueSubType}
                                />
                                <label for="issueSubType1">Crash</label>
                                <input
                                  type="radio"
                                  name="issueSubType"
                                  id="issueSubType2"
                                  className="m-2"
                                  value="Others"
                                  onChange={this.onChangeIssueSubType}
                                  defaultChecked
                                />
                                <label for="issueSubType2">Others</label>
                              </td>
                            </tr>
                            {/* - Severity/Frequency: intermittently/frequently/always */}
                            <tr>
                              <td>
                                <h6>Severity Type</h6>
                              </td>
                              <td>
                                <select
                                  class="custom-select shadow-sm form-control"
                                  name="severity"
                                  value={severity}
                                  onChange={this.onChangeSeverity}
                                >
                                  <option selected>Select Severity Type</option>
                                  <option>Rarely</option>
                                  <option>Intermittently</option>
                                  <option>Always</option>
                                </select>
                              </td>
                            </tr>
                            {/* - Reporting version (On issue version issue is occurring) */}
                            <tr>
                              <td>
                                <h6>Regression Version</h6>
                              </td>
                              <td>
                                <select
                                  class="custom-select shadow-sm form-control"
                                  name="regressionVersion"
                                  value={regressionVersion}
                                  onChange={this.onChangeRegressionVersion}
                                >
                                  <option selected>
                                    Select Regression Version
                                  </option>
                                  <option>BTT-v2020.03</option>
                                  <option>BTT-v2020.06</option>
                                  <option>BTT-v2020.09</option>
                                  <option>BTT-v2020.12</option>
                                  <option>NA</option>
                                </select>
                              </td>
                            </tr>
                            {/* Browser : Chrome/Firefox/Edge/Safari */}
                            <tr>
                              <td>
                                <h6>Browser</h6>
                              </td>
                              <td>
                                <select
                                  class="custom-select shadow-sm form-control"
                                  name="browser"
                                  value={browser}
                                  onChange={this.onChangeBrowser}
                                >
                                  <option selected>Select Browser Name</option>
                                  <option>Google Chrome</option>
                                  <option>Mozilla Firefox</option>
                                  <option>Microsoft Edge</option>
                                  <option>Apple Safari</option>
                                  <option>Others</option>
                                </select>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/* Start Bug input details */}
                  {/* 1st row */}
                  <div class="container p-0">
                    <div class="row">
                      <div class="col-xl-12 p-0">
                        <table class="table table-borderless">
                          <tbody>
                            {/* Title/Summary/Synopsis */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>
                                    <i class="lead font-weight-bold text-danger">
                                      *
                                    </i>{" "}
                                    Bug Title
                                  </h6>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="bugTitle"
                                    value={bugTitle}
                                    onChange={this.onChangeBugTitle}
                                    placeholder="Enter a summary of your bug report"
                                  />
                                </div>
                              </td>
                            </tr>
                            {/* Description - More Info */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>
                                    <i class="lead font-weight-bold text-danger">
                                      *
                                    </i>{" "}
                                    Bug Description
                                  </h6>
                                  <textarea
                                    type="textarea"
                                    class="form-control"
                                    name="bugDesc"
                                    value={bugDesc}
                                    onChange={this.onChangeBugDesc}
                                    placeholder="Enter a detailed description of the problem. Do not create multiple issues in one report"
                                  />
                                </div>
                              </td>
                            </tr>
                            {/* Reproducible Steps */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>Reproducible Steps</h6>
                                  <textarea
                                    type="textarea"
                                    class="form-control"
                                    name="reproducibleSteps"
                                    value={reproducibleSteps}
                                    onChange={this.onChangeReproducibleSteps}
                                    placeholder="Describe the step-by-step process that we can follow to Reproduce the bug"
                                  />
                                </div>
                              </td>
                            </tr>
                            {/* Expected Output */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>Expected Output</h6>
                                  <textarea
                                    type="textarea"
                                    class="form-control"
                                    name="expectedOutput"
                                    value={expectedOutput}
                                    onChange={this.onChangeExpectedOutput}
                                    placeholder="Describe the results that you are expecting when performing the above steps"
                                  />
                                </div>
                              </td>
                            </tr>
                            {/* Actual Output */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>Actual Output</h6>
                                  <textarea
                                    type="textarea"
                                    class="form-control"
                                    name="actualOutput"
                                    value={actualOutput}
                                    onChange={this.onChangeActualOutput}
                                    placeholder="Please report the actual result that you are getting"
                                  />
                                </div>
                              </td>
                            </tr>
                            {/* Source code/test case/stack trace content (Optional) */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>Source code / Test case / Stacktrace</h6>
                                  <textarea
                                    type="textarea"
                                    class="form-control"
                                    name="sourceCode"
                                    value={sourceCode}
                                    onChange={this.onChangeSourceCode}
                                    placeholder="Please provide a complete test case without any dependency"
                                  />
                                </div>
                              </td>
                            </tr>
                            {/* Attachment(with Limit) */}
                            <tr>
                              <td>
                                <div class="form-group ">
                                  <h6>Attachment (Max Limit: 2MB)</h6>
                                  <div className="custom-file">
                                    <input
                                      type="file"
                                      class="custom-file-input form-control"
                                      id="attachment"
                                      name="attachment"
                                      value={attachment}
                                      onChange={this.onChangeAttachment}
                                    />
                                    <label
                                      class="custom-file-label"
                                      for="attachment"
                                      value={attachment}
                                      onChange={this.onChangeAttachment}
                                    >
                                      {attachment}
                                      {/* Choose file */}
                                    </label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            {/* Workaround */}
                            <tr>
                              <td>
                                <div class="form-group">
                                  <h6>Workaround</h6>
                                  <textarea
                                    type="textarea"
                                    class="form-control"
                                    name="workaround"
                                    value={workaround}
                                    onChange={this.onChangeWorkaround}
                                    placeholder="Please provide a temporary method for bypassing this bug, if you have found one"
                                  />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-xl-12">
                        <div class="card shadow-sm">
                          <div class="card-header pt-1 pb-1 text-info">
                            <h5>Submitter Info.</h5>
                          </div>
                          <div class="card-body p-1">
                            <div class="row">
                              <div class="col-xl-4">
                                <div class="form-group mb-1">
                                  <label>
                                    <i class="lead font-weight-bold text-danger">
                                      *
                                    </i>{" "}
                                    Submitter Name
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="submitterName"
                                    value={submitterName}
                                    onChange={this.onChangeSubmitterName}
                                    placeholder="Full Name"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form-group mb-1">
                                  <label>
                                    <i class="lead font-weight-bold text-danger">
                                      *
                                    </i>{" "}
                                    Submitter Email Id
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="submitterEmail"
                                    value={submitterEmail}
                                    onChange={this.onChangeSubmitterEmail}
                                    placeholder="Email ID"
                                  />
                                </div>
                              </div>
                              <div class="col-xl-4">
                                <div class="form-group mb-1">
                                  <label>
                                    <i class="lead font-weight-bold text-danger">
                                      *
                                    </i>{" "}
                                    Company Name
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="submitterCompany"
                                    value={submitterCompany}
                                    onChange={this.onChangeSubmitterCompany}
                                    placeholder="Provide your Company Name or Self"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p className="text-muted font-weight-lighter">
                        <small>
                          In addition, We respects your desire for privacy.
                          Personal data collected from this program will not be
                          sold, given or shared with organizations external to
                          our Company. We will use this data for communications
                          with you to clarify issues regarding the report you
                          submitted and/or status of that report. The issues
                          that you report may be made publicly available,
                          however your personal data will be kept confidential.
                          If you are not comfortable with the above conditions,
                          please do not press the Submit button.
                        </small>
                      </p>
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="acceptCheckbox"
                          value={this.state.acceptCheckbox}
                          onChange={this.onChangeAcceptCheckbox}
                        />
                        <label
                          class="custom-control-label font-italic font-weight-normal text-secondary"
                          for="acceptCheckbox"
                        >
                          Check here to indicate that you have read and agree to
                          the terms of our Service
                        </label>
                      </div>
                    </div>
                    <div class="row m-5">
                      <div class="col-xl-3"></div>
                      <div class="col-xl-6">
                        {reportError ? (
                          <label
                            className="alert alert-danger p-0 d-flex justify-content-center"
                            role="alert"
                          >
                            {reportError}{" "}
                          </label>
                        ) : null}
                        {reportSuccess ? (
                          <label
                            className="alert alert-success p-0 d-flex justify-content-center"
                            role="alert"
                          >
                            {reportSuccess}
                          </label>
                        ) : null}
                        {/* <span onChange={this.onChange}>
                        {success && (
                          <label
                            className="alert alert-success p-0 d-flex justify-content-center"
                            role="alert"
                          >
                            Your Bug(ID={id}) has been registered successfully!
                          </label>
                        )}
                      </span> */}
                        <button
                          type="button"
                          className="btn btn-danger btn-lg btn-block"
                          name="submit"
                          disabled={this.state.acceptCheckbox}
                          onClick={this.onClickCreateBugReport}
                        >
                          SUBMIT REPORT
                        </button>
                      </div>
                      <div class="col-xl-3"></div>
                    </div>
                  </div>
                  {/* End Bug input details */}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default CreateBugDetails;
