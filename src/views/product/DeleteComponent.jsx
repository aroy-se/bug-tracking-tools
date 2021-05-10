import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const DeleteComponent = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    componentId: "",
    componentName: "",
  });

  // Handle function
  function handleChange(event) {
    // reset msg
    setSuccess(false);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setSuccess(false);
    if (input.componentId === "") {
      alert("Component Id should not be empty!");
      return;
    } else if (isNaN(input.componentId)) {
      alert("Only Digits are accepted");
      return;
    }
    const deleteComponent = {
      componentId: input.componentId,
    };
    deleteComponentDetails(deleteComponent);
  }
  var deleteComponentDetails = (componentData) => {
    const parameters = {
      method: "DELETE",
    };
    if (window.confirm("Do you really want to delete the Component?")) {
      // Fetch All!
    } else {
      // Do nothing!
      return;
    }
    fetch(Constants.COMPONENT_URL + parseInt(input.componentId), parameters)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        alert(
          `The Component, ${input.componentId} does not exist in our database!`
        );
      });
    setInput({ componentId: "" });
  };
  return (
    <div className="container" border="0">
      <div class="row">
        <div class="col-xl-3"></div>
        <div class="col-xl-6">
          <div class="card shadow">
            <div class="card-header text-danger shadow-sm">
              <h5>DELETE COMPONENT</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="form-group">
                    <label className="badge badge-light text-dark">
                      Component Id
                    </label>
                    <input
                      type="text"
                      class="form-control shadow-sm"
                      placeholder="Provide a Component ID"
                      name="componentId"
                      value={input.componentId}
                      onChange={handleChange}
                    />
                  </div>
                  {/* delete message */}
                  {/* <label
                    className="insert-status-label"
                    onChange={handleChange}
                  > */}
                  {success && (
                    <label
                      className="alert alert-success p-0 d-flex justify-content-center mt-5"
                      role="alert"
                    >
                      Component deletion successful!
                    </label>
                  )}
                  {/* </label> */}
                </div>
              </div>
              <div className="row">
                <div class="col-xl-12">
                  <div class="form-group">
                    <input
                      type="submit"
                      className="btn btn-danger btn-lg btn-block shadow register#"
                      name="submit"
                      value="DELETE COMPONENT"
                      onClick={handleSubmit}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3"></div>
      </div>
    </div>
  );
};

export default DeleteComponent;
