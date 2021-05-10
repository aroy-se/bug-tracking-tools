import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const DeleteUserDetails = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const [input, setInput] = useState({
    userId: "",
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
    if (input.userId === "") {
      alert("UserId field should not be empty!");
      return;
    }
    const deleteAnUser = {
      userId: input.userId,
    };
    deleteUserDetails(deleteAnUser);
  }
  var deleteUserDetails = (userData) => {
    const parameters = {
      method: "DELETE",
    };
    console.log(Constants.USER_URL + input.userId);
    fetch(Constants.USER_URL + parseInt(input.userId), parameters)
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
        alert(`The User, ${input.userId} does not exist in our database!`);
      });
    setInput({ userId: "" });
  };
  return (
    <div className="container" border="0">
      <div class="row">
        <div class="col-xl-3"></div>
        <div class="col-xl-6">
          <div class="card shadow">
            <div class="card-header text-danger shadow-sm">
              <h5>DELETE A USER RECORD</h5>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xl-12">
                  <div class="form-group">
                    <label className="badge badge-light text-dark">
                      User Id
                    </label>
                    <input
                      type="text"
                      class="form-control shadow-sm"
                      placeholder="Provide a User ID"
                      name="userId"
                      value={input.userId}
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
                      User deletion successful!
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
                      value="DELETE USER"
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
