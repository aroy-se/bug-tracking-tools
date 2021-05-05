import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const NewFeature = () => {
  const initialState = {
    featureTitle: "",
    featureDesc: "",
    submitterName: "",
    submitterEmail: "",
    submitterCompany: "",
  };
  const [input, setInput] = useState(initialState);
  const [id, setId] = useState("");
  const [success, setSuccess] = useState(false);
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
  function handleNewFeatureRequest(event) {
    event.preventDefault();
    const newFeatureRequestObject = {
      newFeatureId: Math.floor(Math.random() * (999999 - 100) + 100), // Just demo purpose
      createdTime: Date().toLocaleString(),
      featureTitle: input.featureTitle,
      featureDesc: input.featureDesc,
      submitterName: input.submitterName,
      submitterEmail: input.submitterEmail,
      submitterCompany: input.submitterCompany,
    };
    setId(newFeatureRequestObject.newFeatureId);
    saveNewFeatureRequestDetails(newFeatureRequestObject);
    setInput((prevState) => {
      return {
        ...prevState,
        featureTitle: "",
        featureDesc: "",
        submitterName: "",
        submitterEmail: "",
        submitterCompany: "",
      };
    });
  }
  var saveNewFeatureRequestDetails = (newFeatureRequestData) => {
    const parameters = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeatureRequestData),
    };
    fetch(Constants.NEW_FEATURE_REQUEST_URL, parameters)
      .then((response) => response.json())
      .then((newFeatureRequestData) => {
        setSuccess(true);
      });
  };
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
                    value={input.featureTitle}
                    onChange={handleChange}
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
                    value={input.featureDesc}
                    onChange={handleChange}
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
                              name="submitterEmail shadow-sm"
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
                              name="submitterCompany shadow-sm"
                              value={input.submitterCompany}
                              onChange={handleChange}
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
                  <span onChange={handleChange}>
                    {success && (
                      <label
                        className="alert alert-success p-0 d-flex justify-content-center"
                        role="alert"
                      >
                        Your new feature request(ID={id}) has been sent
                        successfully!
                      </label>
                    )}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block shadow mb-2"
                    name="submit"
                    onClick={handleNewFeatureRequest}
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
};

export default NewFeature;
