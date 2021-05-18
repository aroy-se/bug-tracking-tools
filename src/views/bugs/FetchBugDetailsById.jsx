import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as Constants from "../../utility/Constants";
import { getFromStorage } from "../../utility/storage";
import $ from "jquery";
import Login from "../common/Login";

const FetchBugDetailsById = (props) => {
  const routeProps = {
    history: props.history,
  };
  const [input, setInput] = useState({
    bugId: "",
    issueType: "",
    component: "",
    reportVersion: "",
    os: "",
    issueSubType: "",
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
    assignee: "",
    eta: "",
    fixVersion: "",
    resolution: "",
    state: "",
    priority: "",
    submitterName: "",
    submitterEmail: "",
    submitterCompany: "",
  });
  const [commentDetails, setCommentDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    commentId: "",
    comment: "",
    commentator: "",
    commentType: "",
    bugUpdateSuccess: "",
    bugUpdateError: "",
  });
  const [viewComments, setViewComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [bugData, setBugData] = useState([]);
  const [editable, setEditable] = useState(false);
  const [etaDate, setEtaDate] = useState(new Date());
  const [componentDetails, setComponentDetails] = useState([]);
  const [assigneeDetails, setAssigneeDetails] = useState([]);

  useEffect(() => {
    $(function () {
      $("[data-hide]").on("click", function () {
        $(this)
          .closest("." + $(this).attr("data-hide"))
          .hide();
      });
    });

    // window.setTimeout(function () {
    //   $(".alert")
    //     .fadeTo(500, 0)
    //     .slideUp(500, function () {
    //       $(this).remove();
    //     });
    // }, 4000);
  }, []);
  useEffect(() => {
    const { bugId } = routeProps.history.location.state;
    fetch(Constants.BUG_URL + parseInt(bugId))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        setBugData(data);
        setInput(data);
        fetchComments(data.bugId);
      })
      .catch(() => {
        console.log("An error found while fetching data from the BugList");
      });
  }, []);

  // For onChange event
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

  // To update the bug details with new input values
  function handleUpdateBugDetails(event) {
    event.preventDefault();
    const bugUpdateObject = {
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
      assignee: input.assignee,
      eta: etaDate,
      fixVersion: input.fixVersion,
      resolution: input.resolution,
      state: input.state,
      priority: input.priority,
      //submitterName: input.,
      //submitterEmail: input.,
      //submitterCompany: input.,
    };
    saveBugDetails(bugUpdateObject);
  }
  // To save the bug object
  async function saveBugDetails(bugUpdateObject) {
    const parameters = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bugUpdateObject),
    };
    await fetch(Constants.BUG_URL + parseInt(input.bugId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
        document.getElementById("bugIdInputText").value = "";
        handleFetchBug();
      });
  }
  async function handleFetchBug() {
    if (input.bugId === "") {
      alert("The Search Field should not be empty!");
      return;
    }
    await fetch(Constants.BUG_URL + parseInt(input.bugId))
      .then((response) => response.json())
      .then((data) => {
        setBugData(data);
        setInput(data);
        // Set data to bug details page
        var bug = data;
        var issueType = JSON.stringify(bug.issueType);
        var component = JSON.stringify(bug.component);
        var reportVersion = JSON.stringify(bug.reportVersion);
        var os = JSON.stringify(bug.os);
        var issueSubType = JSON.stringify(bug.issueSubType);
        var severity = JSON.stringify(bug.severity);
        var regressionVersion = JSON.stringify(bug.regressionVersion);
        var browser = JSON.stringify(bug.browser);
        var bugTitle = JSON.stringify(bug.bugTitle);
        var bugDesc = JSON.stringify(bug.bugDesc);
        var reproducibleSteps = JSON.stringify(bug.reproducibleSteps);
        var expectedOutput = JSON.stringify(bug.expectedOutput);
        var actualOutput = JSON.stringify(bug.actualOutput);
        var sourceCode = JSON.stringify(bug.sourceCode);
        var attachment = JSON.stringify(bug.attachment);
        var workaround = JSON.stringify(bug.workaround);
        var assignee = JSON.stringify(bug.assignee);
        var eta = JSON.stringify(bug.eta);
        var fixVersion = JSON.stringify(bug.fixVersion);
        var resolution = JSON.stringify(bug.resolution);
        var state = JSON.stringify(bug.state);
        var priority = JSON.stringify(bug.priority);

        setInput((bug) => {
          return {
            ...bug,
            issueType: JSON.parse(issueType),
            component: JSON.parse(component),
            reportVersion: JSON.parse(reportVersion),
            os: JSON.parse(os),
            issueSubType: JSON.parse(issueSubType),
            severity: JSON.parse(severity),
            regressionVersion: JSON.parse(regressionVersion),
            browser: JSON.parse(browser),
            bugTitle: JSON.parse(bugTitle),
            bugDesc: JSON.parse(bugDesc),
            reproducibleSteps: JSON.parse(reproducibleSteps),
            expectedOutput: JSON.parse(expectedOutput),
            actualOutput: JSON.parse(actualOutput),
            sourceCode: JSON.parse(sourceCode),
            attachment: JSON.parse(attachment),
            workaround: JSON.parse(workaround),
            assignee: JSON.parse(assignee),
            eta: JSON.parse(eta),
            fixVersion: JSON.parse(fixVersion),
            resolution: JSON.parse(resolution),
            state: JSON.parse(state),
            priority: JSON.parse(priority),
          };
        });
        // fetch comments in bug details page
        fetchComments(input.bugId);
      })
      .catch(() => {
        setSuccess(false);
        alert(`The Bug Id: ${input.bugId} does not exist in our database`);
      });
    // document.getElementById("bugIdInputText").value = "";
  }
  // To fetch all the components from the database
  async function handleOnClickComponent(event) {
    event.preventDefault();
    await fetch(Constants.COMPONENT_URL)
      .then((response) => response.json())
      .then((data) => {
        setComponentDetails(data);
      })
      .catch(() => {
        setSuccess(false);
        alert(`The search input does not exist in our database`);
      });
  }
  // To fetch all the assignee from the database
  async function handleOnClickAssignee(event) {
    event.preventDefault();
    await fetch(Constants.USER_URL)
      .then((response) => response.json())
      .then((data) => {
        setAssigneeDetails(data);
      })
      .catch(() => {
        setSuccess(false);
        alert(`The search input does not exist in our database`);
      });
  }
  function onClickEditableToggle() {
    handleFetchBug();
    setEditable(!editable);
    setSuccess(false);
  }
  function onChangeComment(event) {
    setCommentDetails((prev) => {
      return {
        ...prev,
        comment: event.target.value,
      };
    });
  }
  function onChangeCommentType(event) {
    console.log("Comment Type: " + event.target.value);
    setCommentDetails((prev) => {
      return {
        ...prev,
        commentType: event.target.value,
      };
    });
  }
  // To fetch all the comments from the database
  async function fetchComments(bugId) {
    await fetch(Constants.COMMENT_URL + parseInt(bugId))
      .then((response) => response.json())
      .then((data) => {
        // console.log("comments dataaaaaa:" + JSON.stringify(data));
        setViewComments(data);
      })
      .catch(() => {
        setSuccess(false);
        alert(`No comments in our database`);
      });
  }
  async function onClickAddComment() {
    if (commentDetails.comment === "") {
      alert("Comment can not be empty");
      return;
    }
    const local_storage_user = getFromStorage("btt_current_user");
    if (
      local_storage_user &&
      local_storage_user.user &&
      input.bugId !== null &&
      input.bugId !== ""
    ) {
      const { user } = local_storage_user;
      await fetch(Constants.URL_USER_BY_EXACT_EMAIL + user)
        .then((response) => response.json())
        .then((data) => {
          data.map((user) => {
            var commentator = user.firstName + " " + user.lastName;
            var comType =
              commentDetails.commentType === ""
                ? "public"
                : commentDetails.commentType;
            const commentObject = {
              bugId: input.bugId,
              comment: commentDetails.comment,
              commentator: commentator,
              commentType: comType,
            };
            console.log("CommentObject: " + JSON.stringify(commentObject));
            const parameters = {
              method: "POST",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(commentObject),
            };
            fetch(Constants.COMMENT_URL, parameters)
              .then((response) => response.json())
              .then((jsonData) => {
                if (jsonData.success) {
                  // post comment in bug details page
                  fetchComments(input.bugId);

                  //reset
                  // document.getElementById("comment").value = "";
                  setCommentDetails((prev) => {
                    return {
                      ...prev,
                      bugUpdateSuccess: jsonData.message,
                      bugUpdateError: "",
                      comment: "",
                      commentator: "",
                      commentType: "public",
                    };
                  });
                  // handleFetchBug();
                } else {
                  // alert("No success...");
                  setCommentDetails((prev) => {
                    return {
                      ...prev,
                      bugUpdateSuccess: "",
                      bugUpdateError: jsonData.message,
                    };
                  });
                }
              });

            document.getElementById("comment").value = "";
          });
        });
    } else {
      alert("Either user is not logged in or bug-id not available");
      return;
    }
  }

  function onClickFixVersion() {
    if (input.bugId) {
      const setFixVersionObject = {
        fixVersion: input.fixVersion,
      };
      const parameters = {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(setFixVersionObject),
      };

      fetch(Constants.FIX_VERSION_URL + parseInt(input.bugId), parameters)
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData.success) {
            setSuccess(false);
            alert("Unable to set Fix Version");
          } else {
            {
              setSuccess(true);
              handleFetchBug();
            }
          }
        });
    } else {
      alert("BugId is missing");
    }
  }
  const btt_local_storage_token = getFromStorage("btt_local_storage");
  if (btt_local_storage_token && btt_local_storage_token.token) {
    return (
      <div className="container-fluid mt-3">
        {/* End of search bug id box */}
        <div class="row mb-5">
          {/* col-1 */}
          {/* Issue resolver info */}
          <div class="col-xl-2 pr-0 pl-1">
            <div class="card shadow rounded-0">
              <span class="blockquote card-header shadow-sm">
                <i class="fa fa-bug text-danger" aria-hidden="true">
                  <span className="lead text-info"> Bug Resolution Info</span>
                </i>
              </span>
              <div class="card-body">
                <i class="fas fa-user-edit text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Assignee
                  </span>
                </i>
                {editable === false ? (
                  // Non editable assignee
                  <p
                    class="card-text alert alert-secondary p-1 mt-2 mb-2 rounded-0"
                    role="alert"
                  >
                    <span class="">{bugData.assignee}</span>
                  </p>
                ) : (
                  // Editable assignee
                  <select
                    className="custom-select shadow-sm form-control mt-2 mb-2 rounded-0"
                    name="assignee"
                    id="assignee"
                    value={input.assignee}
                    onChange={handleChange}
                    onClick={handleOnClickAssignee}
                  >
                    <option>Set Assignee</option>
                    {assigneeDetails.map((assignee, index) => (
                      <option>
                        {assignee.firstName} {assignee.lastName}
                      </option>
                    ))}
                  </select>
                )}
                <i
                  class="far fa-calendar-alt text-secondary"
                  aria-hidden="true"
                >
                  <span className="text-monospace text-secondary card-title">
                    {" "}
                    Created Date
                  </span>
                </i>
                <p
                  class="card-text alert alert-secondary p-1 mt-2 mb-2 rounded-0"
                  role="alert"
                >
                  {bugData.createdTime}
                </p>
                <i class="far fa-clock text-secondary" aria-hidden="true">
                  <span className="text-monospace text-secondary card-title">
                    {" "}
                    ETA
                  </span>
                </i>
                {editable === false ? (
                  // Non editable eta
                  <p
                    class="card-text alert alert-secondary p-1 mt-2 mt-2 rounded-0"
                    role="alert"
                  >
                    {bugData.eta}
                  </p>
                ) : (
                  // Editable eta
                  <div className="">
                    <DatePicker
                      selected={etaDate}
                      // dateFormat="DD-MM-YYYY"
                      onChange={(date) => setEtaDate(date)}
                      className="form-control text-secondary shadow-sm mt-2 mb-2 rounded-0"
                      name="eta"
                      // id="eta"
                      // value={input.eta}
                      // onChange={handleChange}
                    />
                  </div>
                )}

                <i class="fas fa-code-branch text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary card-title">
                    {" "}
                    Fix Version
                  </span>
                </i>
                {editable === false ? (
                  // Non editable fix Version
                  <p
                    class="card-text alert alert-secondary p-1 mb-2 mt-2 rounded-0"
                    role="alert"
                  >
                    {bugData.fixVersion}
                  </p>
                ) : // Editable fix Version
                getFromStorage("btt_current_user_role").userRole ===
                  "Project Manager" ? (
                  // SET Fix Version
                  <div class="form-group mt-2">
                    <div class="input-group ">
                      <input
                        type="text"
                        placeholder="Set Fix Version"
                        className="form-control shadow-sm rounded-0"
                        name="fixVersion"
                        id="fixVersion"
                        value={input.fixVersion}
                        onChange={handleChange}
                      />
                      <div class="input-group-append">
                        <button
                          type="button"
                          name="fixVersionBtn"
                          className="btn btn-danger rounded-0"
                          value="Search"
                          onClick={onClickFixVersion}
                        >
                          <i class="fas fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p
                    class="card-text alert alert-secondary p-1 mb-2 mt-2 rounded-0"
                    role="alert"
                  >
                    {bugData.fixVersion}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* </div> form-inline d-flex justify-content-between*/}
          {/* col-2 */}
          <div class="col-xl-8 mb-5 ">
            <div class="card shadow rounded-0 ">
              <div class="card-header text-danger  p-2 shadow-sm">
                <div className="row">
                  <div className="col-xl-3">
                    <div>
                      <h4 className="bugIdLabel">Bug-ID: #{bugData.bugId}</h4>
                    </div>
                  </div>
                  <div className="col-xl-9">
                    {getFromStorage("btt_current_user_role") &&
                    getFromStorage("btt_current_user_role").userRole !==
                      "User" ? (
                      <div className="form-inline d-flex justify-content-between">
                        <div className="form-inline ">
                          {/* SEARCH BY BUG ID */}
                          <div class="form-group">
                            <div class="input-group ">
                              <input
                                type="text"
                                placeholder="Search by Bug ID"
                                required
                                autoComplete="off"
                                className="form-control shadow-sm"
                                name="bugId"
                                id="bugIdInputText"
                                style={{ width: 400 }}
                                value={input.bugId}
                                onChange={handleChange}
                              />
                              <div class="input-group-append">
                                <button
                                  type="button"
                                  name="fetch"
                                  className="btn btn-secondary"
                                  value="Search"
                                  onClick={handleFetchBug}
                                >
                                  <i class="fas fa-search"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Editable switch */}
                        <div class="custom-control custom-switch">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="editBugDetailsId"
                            name="editable"
                            onClick={onClickEditableToggle}
                          />
                          <label
                            class="custom-control-label text-danger"
                            for="editBugDetailsId"
                          >
                            Edit
                          </label>
                        </div>
                      </div>
                    ) : null}
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
                        <tbody>
                          {/* bug-type */}
                          <tr>
                            <td>
                              <span className="badge badge-light">
                                Bug Type
                              </span>
                            </td>
                            <td>
                              {editable === false ? (
                                bugData.issueType === "Bug" ? (
                                  <span className="badge badge-danger font-weight-bold">
                                    {bugData.issueType}
                                  </span>
                                ) : (
                                  <span className="badge badge-primary font-weight-bold ">
                                    {bugData.issueType}
                                  </span>
                                )
                              ) : (
                                // editable bug-type
                                <div>
                                  <select
                                    className="custom-select shadow-sm form-control rounded-0"
                                    name="issueType"
                                    id="issueType"
                                    value={input.issueType}
                                    onChange={handleChange}
                                  >
                                    <option selected>Set IssueType</option>
                                    <option>Bug</option>
                                    <option>Enhancement</option>
                                  </select>
                                </div>
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
                              {editable === false ? (
                                // Non editable component
                                <span class="font-weight-light">
                                  {bugData.component}
                                </span>
                              ) : (
                                // editable component
                                <div>
                                  <select
                                    className="custom-select shadow-sm form-control rounded-0"
                                    name="component"
                                    id="component"
                                    value={input.component}
                                    onChange={handleChange}
                                    onClick={handleOnClickComponent}
                                  >
                                    <option selected>Set Component</option>
                                    {componentDetails.map(
                                      (component, index) => (
                                        <option>
                                          {component.componentName}
                                        </option>
                                      )
                                    )}
                                    <option>NA</option>
                                  </select>
                                </div>
                              )}
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
                              {editable === false ? (
                                // Non editable reportVersion
                                <span class="font-weight-light">
                                  {bugData.reportVersion}
                                </span>
                              ) : (
                                // Non editable reportVersion
                                <select
                                  className="custom-select shadow-sm form-control rounded-0"
                                  name="reportVersion"
                                  id="reportVersion"
                                  value={input.reportVersion}
                                  onChange={handleChange}
                                >
                                  <option selected>
                                    Set Reporting Version
                                  </option>
                                  <option>BTT-v2020.03</option>
                                  <option>BTT-v2020.06</option>
                                  <option>BTT-v2020.09</option>
                                  <option>BTT-v2020.12</option>
                                  <option>BTT-v2021.03</option>
                                  <option>NA</option>
                                </select>
                              )}
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
                              {editable === false ? (
                                // Non editable OS
                                bugData.os === "MacOS" ? (
                                  <i class="fab fa-apple text-secondary">
                                    {" "}
                                    {bugData.os}
                                  </i>
                                ) : bugData.os === "Windows" ? (
                                  <i class="fab fa-windows text-secondary">
                                    {" "}
                                    {bugData.os}
                                  </i>
                                ) : bugData.os === "Linux" ? (
                                  <i class="fab fa-ubuntu text-secondary">
                                    {" "}
                                    {bugData.os}
                                  </i>
                                ) : (
                                  // Others
                                  <i class="fas fa-desktop text-secondary">
                                    {" "}
                                    {bugData.os}
                                  </i>
                                )
                              ) : (
                                // Editable OS
                                <select
                                  class="custom-select shadow-sm form-control rounded-0"
                                  name="os"
                                  id="os"
                                  value={input.os}
                                  onChange={handleChange}
                                >
                                  <option selected>Set OS</option>
                                  <option>Windows</option>
                                  <option>MacOS</option>
                                  <option>Linux</option>
                                  <option>Others</option>
                                </select>
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
                                Set Sub-Type
                              </span>
                            </td>
                            <td>
                              {editable === false ? (
                                bugData.issueSubType === "Crash" ? (
                                  <span className="badge badge-danger font-weight-bold">
                                    {bugData.issueSubType}
                                  </span>
                                ) : (
                                  <span className="badge badge-info font-weight-bold">
                                    {bugData.issueSubType}
                                  </span>
                                )
                              ) : (
                                <div>
                                  <select
                                    className="custom-select shadow-sm form-control rounded-0"
                                    name="issueSubType"
                                    id="issueSubType"
                                    value={input.issueSubType}
                                    onChange={handleChange}
                                  >
                                    <option selected>Set Bug Sub-Type</option>
                                    <option>Crash</option>
                                    <option>Others</option>
                                  </select>
                                </div>
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
                              {editable === false ? (
                                // Non editable sub-component
                                <span class="font-weight-light">
                                  {/* {bugData.subComponent} */}
                                  <span class="font-weight-light">NA</span>
                                </span>
                              ) : (
                                // editable sub-component
                                <div>
                                  <select
                                    className="custom-select shadow-sm form-control rounded-0"
                                    name="subComponent"
                                    id="subComponent"
                                    disabled
                                    value={input.subComponent}
                                    onChange={handleChange}
                                  >
                                    <option selected>Set Sub-component</option>
                                    <option>Sub-Component-1</option>
                                    <option>Sub-Component-2</option>
                                    <option>Sub-Component-3</option>
                                  </select>
                                </div>
                              )}
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
                              {editable === false ? (
                                <span class="font-weight-light">
                                  {bugData.regressionVersion}
                                </span>
                              ) : (
                                <div>
                                  <select
                                    class="custom-select shadow-sm form-control rounded-0"
                                    name="regressionVersion"
                                    id="regressionVersion"
                                    value={input.regressionVersion}
                                    onChange={handleChange}
                                  >
                                    <option selected>Set Regression</option>
                                    <option>BTT-v2020.03</option>
                                    <option>BTT-v2020.06</option>
                                    <option>BTT-v2020.09</option>
                                    <option>BTT-v2020.12</option>
                                    <option>NA</option>
                                  </select>
                                </div>
                              )}
                            </td>
                          </tr>
                          {/* Browser : Google Chrome/Mozilla Firefox/Microsoft Edge/Apple Safari */}
                          <tr>
                            <td>
                              <span className="badge badge-light">Browser</span>
                            </td>
                            <td>
                              {editable === false ? (
                                // Non editable browser
                                bugData.browser === "Google Chrome" ? (
                                  <i class="fab fa-chrome text-secondary">
                                    {" "}
                                    {bugData.browser}
                                  </i>
                                ) : bugData.browser === "Mozilla Firefox" ? (
                                  <i class="fab fa-firefox-browser text-secondary">
                                    {" "}
                                    {bugData.browser}
                                  </i>
                                ) : bugData.browser === "Apple Safari" ? (
                                  <i class="fab fa-safari text-secondary">
                                    {" "}
                                    {bugData.browser}
                                  </i>
                                ) : bugData.browser === "Microsoft Edge" ? (
                                  <i class="fab fa-edge text-secondary">
                                    {" "}
                                    {bugData.browser}
                                  </i>
                                ) : (
                                  // Other browsers
                                  <i class="far fa-window-restore text-secondary">
                                    {" "}
                                    {bugData.browser}
                                  </i>
                                )
                              ) : (
                                // editable browser
                                <div>
                                  <select
                                    class="custom-select shadow-sm form-control rounded-0"
                                    name="browser"
                                    id="browser"
                                    value={input.browser}
                                    onChange={handleChange}
                                  >
                                    <option selected>Set Browser</option>
                                    <option>Google Chrome</option>
                                    <option>Mozilla Firefox</option>
                                    <option>Microsoft Edge</option>
                                    <option>Apple Safari</option>
                                    <option>Others</option>
                                  </select>
                                </div>
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
                              {editable === false ? (
                                // Non editable severity
                                bugData.severity === "Rarely" ? (
                                  <span class="badge badge-info text-light">
                                    {" "}
                                    {bugData.severity}
                                  </span>
                                ) : bugData.severity === "Intermittently" ? (
                                  <span class="badge badge-warning text-primary">
                                    {" "}
                                    {bugData.severity}
                                  </span>
                                ) : bugData.severity === "Always" ? (
                                  <span class="badge badge-warning text-danger">
                                    {" "}
                                    {bugData.severity}
                                  </span>
                                ) : (
                                  // others
                                  <span class="badge badge-secondary text-light">
                                    {" "}
                                    {bugData.severity}
                                  </span>
                                )
                              ) : (
                                // editable severity
                                <select
                                  class="custom-select shadow-sm form-control rounded-0"
                                  name="severity"
                                  id="severity"
                                  value={input.severity}
                                  onChange={handleChange}
                                >
                                  <option selected>Set Severity</option>
                                  <option>Rarely</option>
                                  <option>Intermittently</option>
                                  <option>Always</option>
                                  <option>NA</option>
                                </select>
                              )}
                            </td>
                          </tr>
                          {/* Bug-state: New/WIP/TIP/Fixed/Rejected/Duplicate */}
                          <tr>
                            <td>
                              <span className="badge badge-light">State</span>
                            </td>
                            <td>
                              {editable === false ? (
                                // Non editable Bug state
                                bugData.state === "New" ? (
                                  <span class="badge badge-primary text-light font-weight-bold">
                                    {" "}
                                    {bugData.state}
                                  </span>
                                ) : bugData.state === "Work-In-Progress" ? (
                                  <span class="badge badge-warning text-dark font-weight-bold">
                                    {" "}
                                    {bugData.state}
                                  </span>
                                ) : bugData.state === "Testing-In-Progress" ? (
                                  <span class="badge badge-success text-danger font-weight-bold">
                                    {" "}
                                    {bugData.state}
                                  </span>
                                ) : bugData.state === "Fixed" ? (
                                  <span class="badge badge-success text-light font-weight-bold">
                                    {" "}
                                    {bugData.state}
                                  </span>
                                ) : bugData.state === "Rejected" ? (
                                  <span class="badge badge-dark text-light font-weight-bold">
                                    {" "}
                                    <s>{bugData.state}</s>
                                  </span>
                                ) : (
                                  // Duplicate
                                  <span class="badge badge-secondary text-warning font-weight-bold">
                                    {" "}
                                    {bugData.state}
                                  </span>
                                )
                              ) : (
                                // editable bug state
                                <select
                                  class="custom-select shadow-sm form-control rounded-0"
                                  name="state"
                                  id="state"
                                  value={input.state}
                                  onChange={handleChange}
                                >
                                  <option selected>Set State</option>
                                  <option>New</option>
                                  <option>Work-In-Progress</option>
                                  <option>Testing-In-Progress</option>
                                  <option>Fixed</option>
                                  <option>Rejected</option>
                                  <option>Duplicate</option>
                                </select>
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
                              {editable === false ? (
                                // Non editable resolution
                                bugData.resolution === "Unresolved" ? (
                                  <span class="badge badge-secondary text-light font-weight-bold">
                                    {" "}
                                    {bugData.resolution}
                                  </span>
                                ) : bugData.resolution === "Assigned" ? (
                                  <span class="badge badge-secondary text-warning font-weight-bold">
                                    {" "}
                                    {bugData.resolution}
                                  </span>
                                ) : bugData.resolution === "Open" ? (
                                  <span class="badge badge-info text-light font-weight-bold">
                                    {" "}
                                    {bugData.resolution}
                                  </span>
                                ) : bugData.resolution === "Reopen" ? (
                                  <span class="badge badge-primary text-danger font-weight-bold">
                                    {" "}
                                    {bugData.resolution}
                                  </span>
                                ) : (
                                  // Closed
                                  <span class="badge badge-danger text-light font-weight-bold">
                                    {" "}
                                    <s>{bugData.resolution}</s>
                                  </span>
                                )
                              ) : (
                                // editable resolution
                                <select
                                  class="custom-select shadow-sm form-control rounded-0"
                                  name="resolution"
                                  id="resolution"
                                  value={input.resolution}
                                  onChange={handleChange}
                                >
                                  <option selected>Set Resolution</option>
                                  <option>Unresolved</option>
                                  <option>Assigned</option>
                                  <option>Open</option>
                                  <option>Reopen</option>
                                  <option>Closed</option>
                                </select>
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
                              {editable === false ? (
                                // Non editable priority
                                bugData.priority === "P4-Low" ? (
                                  <span class="badge badge-primary font-weight-bold">
                                    {" "}
                                    {bugData.priority}
                                  </span>
                                ) : bugData.priority === "P3-Medium" ? (
                                  <span class="badge badge-info font-weight-bold">
                                    {" "}
                                    {bugData.priority}
                                  </span>
                                ) : bugData.priority === "P2-High" ? (
                                  <span class="badge badge-warning text-danger font-weight-bold">
                                    {" "}
                                    {bugData.priority}
                                  </span>
                                ) : bugData.priority === "P1-Critical" ? (
                                  <span class="badge badge-danger font-weight-bold">
                                    {" "}
                                    {bugData.priority}
                                  </span>
                                ) : (
                                  // Undecided
                                  <span class="badge badge-secondary font-weight-bold">
                                    {" "}
                                    {bugData.priority}
                                  </span>
                                )
                              ) : (
                                // editable priority
                                <select
                                  class="custom-select shadow-sm form-control rounded-0"
                                  name="priority"
                                  id="priority"
                                  value={input.priority}
                                  onChange={handleChange}
                                >
                                  <option selected>Set Priority</option>
                                  <option>P4-Low</option>
                                  <option>P3-Medium</option>
                                  <option>P2-High</option>
                                  <option>P1-Critical</option>
                                  <option>Undecided</option>
                                </select>
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
                          {editable === false ? (
                            // Non editable duplicate bugs
                            <span class="badge badge-light text-primary font-weight-lighter">
                              NA
                              {/* {bugData.duplicateBugIds} */}
                            </span>
                          ) : (
                            // editable duplicate bugs
                            <a className="font-weight-lighter">
                              <small>Add Duplicate/Similar Bug/s</small>
                            </a>
                          )}
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
                                {editable === false ? (
                                  // Non editable Bug title
                                  <label class="font-weight-light">
                                    {bugData.bugTitle}
                                  </label>
                                ) : (
                                  // editable bug title
                                  <div>
                                    <input
                                      type="text"
                                      class="form-control rounded-0"
                                      name="bugTitle"
                                      id="bugTitle"
                                      value={input.bugTitle}
                                      onChange={handleChange}
                                    />
                                  </div>
                                )}
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
                                {editable === false ? (
                                  // Non editable bug desc
                                  <span class="font-weight-light">
                                    {bugData.bugDesc}
                                  </span>
                                ) : (
                                  // editable bug desc
                                  <div>
                                    <textarea
                                      type="textarea"
                                      class="form-control rounded-0"
                                      name="bugDesc"
                                      id="bugDesc"
                                      value={input.bugDesc}
                                      onChange={handleChange}
                                    />
                                  </div>
                                )}
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
                                {editable === false ? (
                                  // Non editable reproducible steps
                                  <span class="font-weight-light">
                                    {bugData.reproducibleSteps}
                                  </span>
                                ) : (
                                  // editable reproducible steps
                                  <textarea
                                    type="textarea"
                                    class="form-control rounded-0"
                                    name="reproducibleSteps"
                                    id="reproducibleSteps"
                                    value={input.reproducibleSteps}
                                    onChange={handleChange}
                                  />
                                )}
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
                                {editable === false ? (
                                  // Non editable
                                  <span class="font-weight-light">
                                    {bugData.expectedOutput}
                                  </span>
                                ) : (
                                  // editable
                                  <textarea
                                    type="textarea"
                                    class="form-control rounded-0"
                                    name="expectedOutput"
                                    id="expectedOutput"
                                    value={input.expectedOutput}
                                    onChange={handleChange}
                                  />
                                )}
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
                                {editable === false ? (
                                  // Non editable actual Output
                                  <span class="font-weight-light">
                                    {bugData.actualOutput}
                                  </span>
                                ) : (
                                  // editable actual Output
                                  <textarea
                                    type="textarea"
                                    class="form-control rounded-0"
                                    name="actualOutput"
                                    id="actualOutput"
                                    value={input.actualOutput}
                                    onChange={handleChange}
                                  />
                                )}
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
                                {editable === false ? (
                                  // Non editable
                                  <span class="font-weight-light">
                                    <code>{bugData.sourceCode}</code>
                                  </span>
                                ) : (
                                  // editable
                                  <textarea
                                    type="textarea"
                                    class="form-control rounded-0"
                                    name="sourceCode"
                                    id="sourceCode"
                                    value={input.sourceCode}
                                    onChange={handleChange}
                                  />
                                )}
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
                                {editable === false ? (
                                  // Non editable
                                  <span class="font-weight-light">
                                    {bugData.workaround}
                                  </span>
                                ) : (
                                  // editable
                                  <textarea
                                    type="textarea"
                                    class="form-control rounded-0"
                                    name="workaround"
                                    id="workaround"
                                    value={input.workaround}
                                    onChange={handleChange}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                          {/* Comments */}
                          <tr>
                            <td>
                              <div class="form-group m-0">
                                <h6 class="">
                                  <span class="">Comments</span>
                                </h6>
                                <span class="font-weight-light ">
                                  <div class="card-body ml-0 mr-0 pl-0 pr-0 pt-1 pb-1">
                                    {Object.keys(viewComments).length > 0
                                      ? viewComments.map((comments, index) =>
                                          // check for local storage(empty or not)
                                          getFromStorage("btt_local_storage") &&
                                          getFromStorage("btt_local_storage")
                                            .token ? (
                                            // Show comemnt if submitter is a user and comments are public
                                            comments.commentType === "public" &&
                                            getFromStorage(
                                              "btt_current_user_role"
                                            ).userRole === "User" ? (
                                              <div
                                                className="list-group p-1 mb-1 border rounded-0 shadow-sm"
                                                key={index}
                                              >
                                                <span class="mb-1 font-weight-normal text-info">
                                                  <div class="d-flex w-100 justify-content-between">
                                                    <span className="badge badge-light text-primary font-weight-normal ">
                                                      {" "}
                                                      COMMENT #{index + 1}
                                                    </span>
                                                    <small>
                                                      {comments.commentator}
                                                    </small>
                                                  </div>
                                                </span>
                                                <div class="d-flex w-100 justify-content-between">
                                                  <span class="mb-1 font-weight-light text-secondary">
                                                    <span className="badge badge-light text-secondary">
                                                      Comment Details:
                                                    </span>{" "}
                                                    {comments.comment}
                                                  </span>
                                                  <small class="text-secondary font-weight-light">
                                                    <span className="badge badge-pill badge-light">
                                                      Created On:{" "}
                                                    </span>
                                                    <span className="font-weight-lighter text-secondary">
                                                      {comments.createdTime}
                                                    </span>
                                                  </small>
                                                </div>
                                              </div>
                                            ) : // For all except user
                                            getFromStorage(
                                                "btt_current_user_role"
                                              ).userRole !== "User" ? (
                                              <div
                                                className="list-group p-1 mb-1 border rounded-0 shadow-sm"
                                                key={index}
                                              >
                                                <span class="mb-1 font-weight-normal text-info">
                                                  <div class="d-flex w-100 justify-content-between">
                                                    {comments.commentType ===
                                                    "private" ? (
                                                      <span className="badge badge-light text-danger font-weight-normal ">
                                                        {" "}
                                                        COMMENT #{index + 1}
                                                      </span>
                                                    ) : (
                                                      <span className="badge badge-light text-primary font-weight-normal ">
                                                        {" "}
                                                        COMMENT #{index + 1}
                                                      </span>
                                                    )}
                                                    <small>
                                                      {comments.commentator}
                                                    </small>
                                                  </div>
                                                </span>
                                                <div class="d-flex w-100 justify-content-between">
                                                  <span class="mb-1 font-weight-light text-secondary">
                                                    <span className="badge badge-light text-secondary">
                                                      Comment Details:
                                                    </span>{" "}
                                                    {comments.comment}
                                                  </span>
                                                  <small class="text-secondary font-weight-light">
                                                    <span className="badge badge-pill badge-light">
                                                      Created On:{" "}
                                                    </span>
                                                    <span className="font-weight-lighter text-secondary">
                                                      {comments.createdTime}
                                                    </span>
                                                  </small>
                                                </div>
                                              </div>
                                            ) : null
                                          ) : (
                                            alert("Login required")
                                          )
                                        )
                                      : "No Comments"}
                                  </div>
                                  {/* ///////////////////////////// */}
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
                      <div class="card  rounded-0">
                        <div class="card-header p-1 text-info form-inline d-flex justify-content-between">
                          <i class="fa fa-comments" aria-hidden="true">
                            <span> Add Comment</span>
                          </i>
                          {getFromStorage("btt_current_user_role") &&
                          getFromStorage("btt_current_user_role").userRole !==
                            "User" ? (
                            <div
                              class="btn-group btn-group-sm"
                              role="group"
                              aria-label="Visibility"
                            >
                              <button
                                type="button"
                                class="btn btn-outline-primary border-right-0 pt-0 pb-0 pl-1 pr-1"
                                value="public"
                                onClick={onChangeCommentType}
                              >
                                Public
                              </button>{" "}
                              <button
                                type="button"
                                class="btn btn-outline-danger pt-0 pb-0 pl-1 pr-1"
                                value="private"
                                onClick={onChangeCommentType}
                              >
                                Private
                              </button>
                            </div>
                          ) : // just for user
                          null}
                        </div>
                        <div class="card-body p-1">
                          <div class="form-group mb-1">
                            <textarea
                              type="textarea"
                              className="form-control pb-0 rounded-0"
                              name="comment"
                              id="comment"
                              value={commentDetails.comment}
                              onChange={onChangeComment}
                              placeholder="Post your comments here..."
                            />
                          </div>
                          <div class="form-group m-0 ">
                            <button
                              type="submit"
                              class="btn btn-sm btn-outline-info rounded-0"
                              onClick={onClickAddComment}
                            >
                              Add Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Update button */}
                  <div class="row mt-4">
                    <div class="col-xl-3"></div>
                    <div class="col-xl-6">
                      {commentDetails.bugUpdateError ? (
                        <div
                          class="alert alert-danger"
                          id="selectCodeNotificationArea"
                          hidden="hidden"
                        >
                          <button type="button" class="close" data-hide="alert">
                             &times;
                          </button>
                          {commentDetails.bugUpdateError}
                        </div>
                      ) : // <label
                      //   className="alert alert-danger p-0 d-flex justify-content-center"
                      //   role="alert"
                      // >
                      //   {commentDetails.bugUpdateError}{" "}
                      // </label>
                      null}
                      {commentDetails.bugUpdateSuccess ? (
                        <div
                          class="alert alert-success"
                          id="selectCodeNotificationArea"
                          hidden="hidden"
                        >
                          <button type="button" class="close" data-hide="alert">
                             &times;
                          </button>
                          {commentDetails.bugUpdateSuccess}
                        </div>
                      ) : null}

                      <span>
                        {success && (
                          <label
                            className="alert alert-success p-0 d-flex justify-content-center"
                            role="alert"
                          >
                            Bug updation successful!
                          </label>
                        )}
                      </span>
                      {editable ? (
                        <button
                          type="button"
                          className="btn btn-danger btn-lg btn-block shadow-lg"
                          name="submit"
                          onClick={handleUpdateBugDetails}
                        >
                          UPDATE REPORT
                        </button>
                      ) : null}
                    </div>
                    <div class="col-xl-3"></div>
                  </div>
                </div>
                {/* End Bug input details */}
              </div>
            </div>
          </div>
          {/* col-3 */}
          {/* Submitter info */}
          <div class="col-xl-2 pl-0 pr-1">
            <div class="card shadow rounded-0">
              <span class="blockquote card-header text-info shadow-sm">
                Submitter Info
              </span>
              <div class="card-body">
                <i class="far fa-user text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Submitter Name
                  </span>
                </i>
                <p
                  class="card-text alert alert-secondary  mb-2 mt-2 p-1 rounded-0"
                  role="alert"
                >
                  {bugData.submitterName}
                </p>
                <i class="fas fa-at text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Submitter Email-ID
                  </span>
                </i>
                <p
                  class="card-text alert alert-secondary  mb-2 mt-2 p-1 rounded-0"
                  role="alert"
                >
                  {bugData.submitterEmail}
                </p>
                <i class="far fa-building text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Company
                  </span>
                </i>
                <p
                  class="card-text alert alert-secondary mb-2 mt-2 p-1 rounded-0"
                  role="alert"
                >
                  {bugData.submitterCompany}
                </p>
                <i class="fas fa-paperclip text-secondary" aria-hidden="true">
                  <span class="text-monospace card-title text-secondary">
                    {" "}
                    Attachment
                  </span>
                </i>
                {editable === false ? (
                  // Non editable attachment
                  <p
                    class="card-text alert alert-secondary p-1 mb-2 mt-2 rounded-0"
                    role="alert"
                  >
                    {bugData.attachment}
                  </p>
                ) : (
                  // Editable attachment
                  <div className="custom-file">
                    <input
                      type="file"
                      class="custom-file-input form-control"
                      id="attachment"
                      name="attachment"
                      // value={input.attachment}
                      // onChange={handleChange}
                    />
                    <label
                      class="custom-file-label"
                      for="attachment"
                      // value={input.attachment}
                      // onChange={handleChange}
                    >
                      {input.attachment}
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <Login />;
  }
};

export default FetchBugDetailsById;
