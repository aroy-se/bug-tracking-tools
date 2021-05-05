import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const DeleteUserDetails = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    // userId: 0,
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    photo: "",
    email: "",
    mobile: "",
    moreInfo: "",
  });

  // Handle function
  function handleChange(event) {
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
    const deleteAnUser = {
      userId: input.userId,
    };
    deleteUserDetails(deleteAnUser);
  }
  var deleteUserDetails = (userData) => {
    const parameters = {
      method: "DELETE",
    };
    console.log(Constants.URL + input.userId);
    fetch(Constants.URL + parseInt(input.userId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      });
    setInput({ userId: "" });
  };
  return (
    <div className="container" border="0">
      <div class="row mt-5">
        <div class="col-xl-3"></div>
        <div class="col-xl-6">
          <div class="card shadow mb-5">
            <div class="card-header text-danger">
              <h5>DELETE A USER RECORD</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="form-group">
                    <label>User Id</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Provide a User ID"
                      name="userId"
                      value={input.userId}
                      onChange={handleChange}
                    />
                  </div>
                  {/* delete message */}
                  <label
                    className="insert-status-label"
                    onChange={handleChange}
                  >
                    {success && "The record has been deleted successfully!"}
                  </label>
                </div>
              </div>
              <div className="row">
                <div class="col-xl-12">
                  <div class="form-group">
                    <input
                      type="submit"
                      className="btn btn-danger btn-lg btn-block register#"
                      name="submit"
                      value="DELETE"
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

export default DeleteUserDetails;
