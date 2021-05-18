import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Constants from "../../utility/Constants";

class BugList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bugDetails: [],
      bugId: "",
      bugTitle: "",
      searchValue: "",
      searchInputText: "",
    };
    this.fetchDatafromDatabase = this.fetchDatafromDatabase.bind(this);
  }
  //  React Life cycle method
  componentDidMount() {
    const { searchInputText } = this.props.history.location.state;
    this.setState({ searchValue: searchInputText });
    var target_url = Constants.BUG_URL;
    var catch_err_msg = "";
    if (searchInputText === "") {
      if (window.confirm("Do you really want to fetch all the Bugs?")) {
        // Fetch All!
      } else {
        // Do nothing!
        return;
      }
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

  componentDidUpdate(prevProps) {
    const { searchInputText } = this.props.history.location.state;
    if (this.state.searchValue !== searchInputText) {
      this.setState({
        searchValue: searchInputText,
      });
      var target_url = Constants.BUG_URL;
      var catch_err_msg = "";
      if (searchInputText === "") {
        if (window.confirm("Do you really want to fetch all the Bugs?")) {
          // Fetch All!
        } else {
          // Do nothing!
          return;
        }
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
      // window.location.href = window.location.href;
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

  render() {
    // const btt_local_storage_token = getFromStorage("btt_local_storage");
    // if (btt_local_storage_token && btt_local_storage_token.token) {
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
                </div>
              </div>
              <div class="card-body">
                {this.state.bugDetails.map((bug, index) => (
                  <div className="list-group p-1" key={index}>
                    <Link
                      class="list-group-item list-group-item-action flex-column align-items-start"
                      to={{
                        pathname: `/fetchBugDetailsById`,
                        // pathname: `/updateBugDetails`,
                        state: {
                          bugId: bug.bugId,
                        },
                      }}
                    >
                      <span class="mb-1 font-weight-normal text-info">
                        {bug.issueType === "Bug" ? (
                          <span className="badge badge-light text-danger">
                            {" "}
                            Bug ID #{bug.bugId}
                          </span>
                        ) : (
                          <span className="badge badge-light text-primary">
                            {" "}
                            Bug ID #{bug.bugId}
                          </span>
                        )}
                      </span>
                      <div class="d-flex w-100 justify-content-between">
                        <span class="mb-1 font-weight-light text-secondary">
                          <span className="badge badge-light text-secondary">
                            Bug Title:
                          </span>{" "}
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
    // } else {
    //   return <Login />;
    // }
  }
}

export default BugList;
