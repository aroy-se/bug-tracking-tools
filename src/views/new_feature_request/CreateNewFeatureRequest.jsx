import React from "react";
import * as Constants from "../../utility/Constants";
import { getFromStorage } from "../../utility/storage";
import Login from "../common/Login";

class CreateNewFeatureRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newFeatureRequestError: "",
      newFeatureRequestSuccess: "",

      featureTitle: "",
      featureDesc: "",
      submitterName: "",
      submitterEmail: "",
      submitterCompany: "",
    };

    this.onChangeFeatureTitle = this.onChangeFeatureTitle.bind(this);
    this.onChangeFeatureDesc = this.onChangeFeatureDesc.bind(this);
    this.onChangeSubmitterName = this.onChangeSubmitterName.bind(this);
    this.onChangeSubmitterEmail = this.onChangeSubmitterEmail.bind(this);
    this.onChangeSubmitterCompany = this.onChangeSubmitterCompany.bind(this);

    this.onClickCreateNewFeatureRequest =
      this.onClickCreateNewFeatureRequest.bind(this);
  }
  onChangeFeatureTitle(event) {
    this.setState({
      featureTitle: event.target.value,
    });
  }
  onChangeFeatureDesc(event) {
    this.setState({
      featureDesc: event.target.value,
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
  onClickCreateNewFeatureRequest(event) {
    event.preventDefault();
    // Grab state
    const {
      featureTitle,
      featureDesc,
      submitterName,
      submitterEmail,
      submitterCompany,
    } = this.state;

    // Post request to backend
    fetch(Constants.NEW_FEATURE_REQUEST_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        featureTitle: featureTitle,
        featureDesc: featureDesc,
        submitterName: submitterName,
        submitterEmail: submitterEmail,
        submitterCompany: submitterCompany,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            newFeatureRequestError: "",
            newFeatureRequestSuccess: json.message,

            featureTitle: "",
            featureDesc: "",
            submitterName: "",
            submitterEmail: "",
            submitterCompany: "",
          });
        } else {
          this.setState({
            newFeatureRequestSuccess: "",
            newFeatureRequestError: json.message,
          });
        }
      });
  }

  render() {
    const btt_local_storage_token = getFromStorage("btt_local_storage");
    if (btt_local_storage_token && btt_local_storage_token.token) {
      const {
        newFeatureRequestError,
        newFeatureRequestSuccess,
        featureTitle,
        featureDesc,
        submitterName,
        submitterEmail,
        submitterCompany,
      } = this.state;
      return (
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-xl-2"></div>
            <div className="col-xl-8">
              <div class="card shadow">
                <div class="card-header bg-info text-light shadow">
                  <span className="lead">New Feature Request</span>
                </div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label for="formGroupExampleInput">Feature Title</label>
                      <input
                        type="text"
                        class="form-control shadow-sm"
                        id="formGroupExampleInput"
                        placeholder="Feature Title"
                        name="featureTitle"
                        value={featureTitle}
                        onChange={this.onChangeFeatureTitle}
                      />
                    </div>
                    <div class="form-group">
                      <label for="formGroupExampleInput2">
                        Feature Description
                      </label>
                      <textarea
                        type="textarea"
                        class="form-control shadow-sm"
                        name="featureDesc"
                        value={featureDesc}
                        onChange={this.onChangeFeatureDesc}
                        placeholder="Provide detailed description of the new feature proposal"
                      />
                    </div>
                  </form>
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
                                <label>Submitter Name</label>
                                <input
                                  type="text"
                                  class="form-control shadow-sm"
                                  name="submitterName"
                                  value={submitterName}
                                  onChange={this.onChangeSubmitterName}
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
                                  name="submitterEmail shadow-sm"
                                  value={submitterEmail}
                                  onChange={this.onChangeSubmitterEmail}
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
                                  name="submitterCompany shadow-sm"
                                  value={submitterCompany}
                                  onChange={this.onChangeSubmitterCompany}
                                  placeholder="Company Name"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-4">
                    <div class="col-xl-3"></div>
                    <div class="col-xl-6">
                      {/* <span onChange={this.onChange}>
                      {success && (
                        <label
                          className="alert alert-success p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          Your new feature request(ID={id}) has been sent
                          successfully!
                        </label>
                      )}
                    </span> */}
                      {newFeatureRequestError ? (
                        <label
                          className="alert alert-danger p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          {newFeatureRequestError}{" "}
                        </label>
                      ) : null}
                      {newFeatureRequestSuccess ? (
                        <label
                          className="alert alert-success p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          {newFeatureRequestSuccess}
                        </label>
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-danger btn-lg btn-block shadow mb-2"
                        name="submit"
                        onClick={this.onClickCreateNewFeatureRequest}
                      >
                        NEW FEATURE REQUEST
                      </button>
                    </div>
                    <div class="col-xl-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2"></div>
          </div>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default CreateNewFeatureRequest;
