import React, { Component } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import * as Constants from "../../utility/Constants";

class ViewNewFeatureRequestList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newFeatureRequestDetails: [],
      newFeatureRequestId: "",
      newFeatureRequestTitle: "",
      searchValue: "",
      searchInputText: "",
    };
    this.fetchDataFromDatabase = this.fetchDataFromDatabase.bind(this);
  }
  //  React Life cycle method
  componentDidMount() {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip();
    });
    var target_url = Constants.NEW_FEATURE_REQUEST_URL;
    var catch_err_msg = "";
    this.fetchDataFromDatabase(target_url, false, catch_err_msg);
    // const { searchInputText } = this.props.history.location.state;
    // this.setState({ searchValue: searchInputText });
    // var target_url = Constants.NEW_FEATURE_REQUEST_URL;
    // var catch_err_msg = "";
    // if (searchInputText === "") {
    //   if (window.confirm("Do you really want to fetch all the Bugs?")) {
    //     // Fetch All!
    //   } else {
    //     // Do nothing!
    //     return;
    //   }
    //   // Calling whole newFeatureRequest list
    //   this.fetchDataFromDatabase(target_url, false, catch_err_msg);
    // }
    // else if (isNaN(searchInputText)) {
    //   // fetch data by newFeatureRequest title
    //   target_url = Constants.NEW_FEATURE_REQUEST_BY_TITLE_URL + searchInputText;
    //   catch_err_msg = searchInputText;
    //   this.fetchDataFromDatabase(target_url, false, catch_err_msg);
    // }
    // else {
    //   // fetch data by newFeatureRequest id
    //   target_url =
    //     Constants.NEW_FEATURE_REQUEST_URL + parseInt(searchInputText);
    //   catch_err_msg = searchInputText;
    //   this.fetchDataFromDatabase(target_url, true, catch_err_msg);
    // }
  }

  //   componentDidUpdate(prevProps) {
  //     const { searchInputText } = this.props.history.location.state;
  //     if (this.state.searchValue !== searchInputText) {
  //       this.setState({
  //         searchValue: searchInputText,
  //       });
  //       var target_url = Constants.NEW_FEATURE_REQUEST_URL;
  //       var catch_err_msg = "";
  //       if (searchInputText === "") {
  //         if (window.confirm("Do you really want to fetch all the Bugs?")) {
  //           // Fetch All!
  //         } else {
  //           // Do nothing!
  //           return;
  //         }
  //         // Calling whole newFeatureRequest list
  //         this.fetchDataFromDatabase(target_url, false, catch_err_msg);
  //       }
  //       //   else if (isNaN(searchInputText)) {
  //       //     // fetch data by newFeatureRequest title
  //       //     target_url = Constants.NEW_FEATURE_REQUEST_BY_TITLE_URL + searchInputText;
  //       //     catch_err_msg = searchInputText;
  //       //     this.fetchDataFromDatabase(target_url, false, catch_err_msg);
  //       //   }
  //       else {
  //         // fetch data by newFeatureRequest id
  //         target_url =
  //           Constants.NEW_FEATURE_REQUEST_URL + parseInt(searchInputText);
  //         catch_err_msg = searchInputText;
  //         this.fetchDataFromDatabase(target_url, true, catch_err_msg);
  //       }
  //       // window.location.href = window.location.href;
  //     }
  //   }

  /**
   * To fetch data
   * arg1- var(string):: db url
   * arg2- boolean:: wrap the data inside an array
   * arg3- var(string):: error-catch message
   */
  fetchDataFromDatabase(url, wrapArray, catch_err_msg) {
    console.log("feature url : " + url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("feature data : " + JSON.stringify(data));
        if (wrapArray === true) {
          this.setState({ newFeatureRequestDetails: new Array(data) });
        } else {
          this.setState({ newFeatureRequestDetails: data });
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
            <div class="card shadow">
              <div class="card-header shadow-sm">
                <div className="form-inline d-flex justify-content-between">
                  <i
                    class="fa fa-newFeatureRequest text-info"
                    aria-hidden="true"
                  >
                    <span className="lead text-info">
                      {" "}
                      New Feature Request List
                    </span>
                  </i>
                </div>
              </div>
              <div class="card-body">
                {this.state.newFeatureRequestDetails.map(
                  (newFeatureRequest, index) => (
                    <div className="list-group p-1" key={index}>
                      <div id="accordion">
                        <div class="card">
                          <div class="card-header" id="headingOne">
                            <h5 class="mb-0">
                              <button
                                class="btn btn-link text-info p-0"
                                data-toggle="collapse"
                                data-target={"#collapse" + index + 1}
                                // aria-expanded="true"
                                // aria-controls="collapse1"
                              >
                                <span className="badge badge-light text-primary">
                                  Feature ID #{newFeatureRequest.featureId}
                                </span>
                                <span className="badge badge-light text-secondary">
                                  - {newFeatureRequest.featureTitle}
                                </span>
                              </button>
                            </h5>
                          </div>

                          <div
                            id={"collapse" + index + 1}
                            class="collapse"
                            // class="collapse show"
                            // aria-labelledby="headingOne"
                            data-parent="#accordion"
                          >
                            <div class="card-body">
                              <span class="mb-1 font-weight-normal text-info">
                                <div class="d-flex w-100 justify-content-between">
                                  <span class="mb-1 font-weight-light text-secondary">
                                    <span className="badge badge-light text-secondary">
                                      Feature Title:
                                    </span>{" "}
                                    {newFeatureRequest.featureTitle}
                                  </span>
                                  <small>
                                    <span className="badge  badge-light">
                                      Submitter:{" "}
                                    </span>

                                    <span className="badge  badge-light text-info">
                                      {newFeatureRequest.submitterName}
                                    </span>
                                    <span className="badge  badge-light text-primary">
                                      <u>{newFeatureRequest.submitterEmail}</u>
                                    </span>
                                    <span className="badge  badge-light text-secondary">
                                      from
                                    </span>
                                    <span className="badge  badge-light text-info">
                                      {newFeatureRequest.submitterCompany}
                                    </span>
                                  </small>
                                </div>
                              </span>
                              <div class="d-flex w-100 justify-content-between">
                                <span class="mb-1 font-weight-light text-secondary">
                                  <span className="badge badge-light text-secondary">
                                    Feature Description:
                                  </span>{" "}
                                  {newFeatureRequest.featureDesc}
                                </span>
                                <small class="text-secondary font-weight-light">
                                  <span className="badge badge-pill badge-light">
                                    Created On:{" "}
                                  </span>
                                  <span className="font-weight-lighter text-secondary">
                                    {newFeatureRequest.createdTime}
                                  </span>
                                </small>
                                {/* <small>{newFeatureRequest.newFeatureRequestDesc}</small> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
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

export default ViewNewFeatureRequestList;
