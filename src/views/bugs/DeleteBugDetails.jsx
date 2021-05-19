import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const DeleteBugDetails = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    bugId: "",
    bugName: "",
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
    if (input.bugId === "") {
      alert("Bug Id should not be empty!");
      return;
    } else if (isNaN(input.bugId)) {
      alert("Only Digits are accepted");
      return;
    }
    const deleteBug = {
      bugId: input.bugId,
    };
    deleteBugDetails(deleteBug);
  }
  var deleteBugDetails = (bugData) => {
    const parameters = {
      method: "DELETE",
    };
    if (window.confirm("Do you really want to delete the Bug?")) {
      // Fetch All!
    } else {
      // Do nothing!
      return;
    }
    fetch(Constants.BUG_URL + parseInt(input.bugId), parameters)
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
        alert(`The Bug, ${input.bugId} does not exist in our database!`);
      });
    setInput({ bugId: "" });
  };
  return (
    <div className="container" border="0">
      <div class="row">
        <div class="col-xl-3"></div>
        <div class="col-xl-6">
          <div class="card shadow mt-3 rounded-0">
            <div class="card-header text-danger shadow-sm">
              <h5>DELETE BUG</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="form-group">
                    <label className="badge badge-light text-dark">
                      Bug ID
                    </label>
                    <input
                      type="text"
                      class="form-control shadow-sm rounded-0"
                      placeholder="Provide a Bug ID"
                      name="bugId"
                      value={input.bugId}
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
                      Bug deletion successful!
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
                      value="DELETE BUG"
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

export default DeleteBugDetails;
