import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
import bug_img from "../../assets/images/bug64.jpg";

const CreateBugDetails = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const initialState = {
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

    assignee: "Unknown",
    eta: "NA",
    fixVersion: "NA",
    resolution: "Unresolved",
    state: "New",
    priority: "P4-Low",
    // duplicateBugIds: [""],
  };
  const [input, setInput] = useState(initialState);
  // Handle function
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    // reset the status label
    setSuccess(false);
  }
  function handleReportBug(event) {
    event.preventDefault();
    const newBug = {
      bugId: Math.floor(Math.random() * (999999 - 100) + 100), // Just demo purpose
      createdTime: Date().toLocaleString(),
      issueType: input.issueType,
      component: input.component,
      reportVersion: input.reportVersion,
      os: input.os,
      issueSubType: input.issueSubType,
      severity: input.severity,
      regressionVersion: input.regressionVersion,
      browser: input.browser,

      bugTitle: input.bugTitle,
      bugDesc: input.bugDesc,
      reproducibleSteps: input.reproducibleSteps,
      expectedOutput: input.expectedOutput,
      actualOutput: input.actualOutput,
      sourceCode: input.sourceCode,
      attachment: input.attachment,
      workaround: input.workaround,

      assignee: "Unknown",
      eta: "NA",
      fixVersion: "NA",
      resolution: "Unresolved",
      state: "New",
      priority: "P4-Low",
      // duplicateBugIds: [""],

      submitterName: input.submitterName,
      submitterEmail: input.submitterEmail,
      submitterCompany: input.submitterCompany,
    };
    saveBugDetails(newBug);
    // resetting the form fields after successful insertion
    setInput((prevState) => {
      return {
        ...prevState,
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

        assignee: "Unknown",
        eta: "NA",
        fixVersion: "NA",
        resolution: "Unresolved",
        state: "New",
        priority: "P4-Low",
        // duplicateBugIds: [""],
      };
    });
  }
  var saveBugDetails = (bugData) => {
    const parameters = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bugData),
    };
    fetch(Constants.BUG_URL, parameters)
      .then((response) => response.json())
      .then((bugData) => {
        setSuccess(true);
      });
  };
  return (
    <div className="container p-0 pt-5">
      <div class="row">
        <div class="col-xl-12 p-0 ">
          <div class="card">
            <div class="card-header text-danger form-inline d-flex justify-content-between">
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
                            <h6>Bug Type</h6>
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="issueType"
                              id="issueType1"
                              className="m-2"
                              value="Bug"
                              onChange={handleChange}
                              defaultChecked
                            />
                            <label for="issueType1">Bug</label>
                            <input
                              type="radio"
                              name="issueType"
                              id="issueType2"
                              className="m-2"
                              value="Enhancement"
                              onChange={handleChange}
                            />
                            <label for="issueType2">Enhancement</label>
                          </td>
                        </tr>
                        {/* - Affected Component: Component n Sub-component */}
                        <tr>
                          <td>
                            <h6>Component</h6>
                          </td>
                          <td>
                            <select
                              className="custom-select shadow-sm form-control"
                              name="component"
                              value={input.component}
                              onChange={handleChange}
                            >
                              <option selected>Select Any Component</option>
                              <option>Component-1</option>
                              <option>Component-2</option>
                              <option>Component-3</option>
                              <option>BTT-Authentication</option>
                              <option>BTT-Bugs</option>
                              <option>BTT-Users</option>
                            </select>
                          </td>
                        </tr>
                        {/* - Reporting version (On issue version issue is occurring) */}
                        <tr>
                          <td>
                            <h6>Reporting Version</h6>
                          </td>
                          <td>
                            <select
                              className="custom-select shadow-sm form-control"
                              name="reportVersion"
                              value={input.reportVersion}
                              onChange={handleChange}
                            >
                              <option selected>Select Reporting Version</option>
                              <option>BTT-v2020.03</option>
                              <option>BTT-v2020.06</option>
                              <option>BTT-v2020.09</option>
                              <option>BTT-v2020.12</option>
                              <option>BTT-v2021.03</option>
                              <option>BTT-v2021.06</option>
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
                              value={input.os}
                              onChange={handleChange}
                            >
                              <option selected>Select Operating System</option>
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
                            <h6>Bug Sub-Type</h6>
                          </td>
                          <td>
                            <input
                              type="radio"
                              name="issueSubType"
                              id="issueSubType1"
                              className="m-2"
                              value="crash"
                              onChange={handleChange}
                            />
                            <label for="issueSubType1">Crash</label>
                            <input
                              type="radio"
                              name="issueSubType"
                              id="issueSubType2"
                              className="m-2"
                              value="others"
                              onChange={handleChange}
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
                              value={input.severity}
                              onChange={handleChange}
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
                              value={input.regressionVersion}
                              onChange={handleChange}
                            >
                              <option selected>
                                Select Regression Version
                              </option>
                              <option>BTT-v2020.03</option>
                              <option>BTT-v2020.06</option>
                              <option>BTT-v2020.09</option>
                              <option>BTT-v2020.12</option>
                              <option>BTT-v2021.03</option>
                              <option>BTT-v2021.06</option>
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
                              value={input.browser}
                              onChange={handleChange}
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
                              <h6>Bug Title</h6>
                              <input
                                type="text"
                                class="form-control"
                                name="bugTitle"
                                value={input.bugTitle}
                                onChange={handleChange}
                                placeholder="Enter a summary of your bug report"
                              />
                            </div>
                          </td>
                        </tr>
                        {/* Description - More Info */}
                        <tr>
                          <td>
                            <div class="form-group">
                              <h6>Bug Description</h6>
                              <textarea
                                type="textarea"
                                class="form-control"
                                name="bugDesc"
                                value={input.bugDesc}
                                onChange={handleChange}
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
                                value={input.reproducibleSteps}
                                onChange={handleChange}
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
                                value={input.expectedOutput}
                                onChange={handleChange}
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
                                value={input.actualOutput}
                                onChange={handleChange}
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
                                value={input.sourceCode}
                                onChange={handleChange}
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
                                  value={input.attachment}
                                  onChange={handleChange}
                                />
                                <label
                                  class="custom-file-label"
                                  for="attachment"
                                  value={input.attachment}
                                  onChange={handleChange}
                                >
                                  {input.attachment}
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
                                value={input.workaround}
                                onChange={handleChange}
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
                    <div class="card">
                      <div class="card-header pt-1 pb-1 text-info">
                        <h5>Submitter Info.</h5>
                      </div>
                      <div class="card-body p-1">
                        <div class="row">
                          <div class="col-xl-4">
                            <div class="form-group mb-1">
                              <label>Submitter Name</label>
                              <input
                                type="text"
                                class="form-control"
                                name="submitterName"
                                value={input.submitterName}
                                onChange={handleChange}
                                placeholder="Full Name"
                              />
                            </div>
                          </div>
                          <div class="col-xl-4">
                            <div class="form-group mb-1">
                              <label>Submitter Email Id</label>
                              <input
                                type="text"
                                class="form-control"
                                name="submitterEmail"
                                value={input.submitterEmail}
                                onChange={handleChange}
                                placeholder="Email ID"
                              />
                            </div>
                          </div>
                          <div class="col-xl-4">
                            <div class="form-group mb-1">
                              <label>Company Name</label>
                              <input
                                type="text"
                                class="form-control"
                                name="submitterCompany"
                                value={input.submitterCompany}
                                onChange={handleChange}
                                placeholder="Provide your Company Name or Self"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <i class="fa fa-info-circle" aria-hidden="true"> */}
                {/* <span className="terms-info"> */}
                {/* Please accept if you agree to our{" "} */}
                {/* <a href="#!">Terms of Service.</a> */}
                {/* </span> */}
                {/* </i> */}
                <div className="mt-3">
                  <p className="text-muted font-weight-lighter">
                    In addition, We respects your desire for privacy. Personal
                    data collected from this program will not be sold, given or
                    shared with organizations external to our Company. We will
                    use this data for communications with you to clarify issues
                    regarding the report you submitted and/or status of that
                    report. The issues that you report may be made publicly
                    available, however your personal data will be kept
                    confidential. If you are not comfortable with the above
                    conditions, please do not press the Submit button.
                  </p>
                  <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="acceptReport"
                    />
                    <label
                      class="custom-control-label font-italic font-weight-normal text-secondary"
                      for="acceptReport"
                    >
                      Check here to indicate that you have read and agree to the
                      terms of our Service
                    </label>
                  </div>
                </div>
                <div class="row m-5">
                  <div class="col-xl-3"></div>
                  <div class="col-xl-6">
                    <span onChange={handleChange}>
                      {success && (
                        <label
                          className="alert alert-success p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          Your Bug has been registered successfully!
                        </label>
                      )}
                    </span>
                    <button
                      type="button"
                      className="btn btn-danger btn-lg btn-block"
                      name="submit"
                      onClick={handleReportBug}
                    >
                      SUBMIT THE REPORT
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
};

export default CreateBugDetails;
