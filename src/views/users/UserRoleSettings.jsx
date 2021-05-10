import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
const UserRoleSettings = () => {
  const initialState = {
    userId: "",
    firstName: "",
    lastName: "",
    userName: "",
    userRole: "",
    newRole: "",
    roleSuccess: "",
    roleError: "",
  };
  const [input, setInput] = useState(initialState);
  const [id, setID] = useState("");
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

  function handleUserRoleSubmit(event) {
    event.preventDefault();

    setSuccess(false);
    if (input.newRole === "") {
      alert(`Please select a UserRole for the User, ${input.userName}!`);
      return;
    }
    if (input.userRole === input.newRole) {
      alert("Selected and the existing UserRole, both are same!");
      return;
    }

    const newUserRoleSettingsObject = {
      userId: input.userId,
      firstName: input.firstName,
      lastName: input.lastName,
      userName: input.userName,
      userRole: input.newRole,
    };
    saveUserRoleSettings(newUserRoleSettingsObject);
    setInput((prevState) => {
      return {
        ...prevState,
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        userRole: "",
        newRole: "",
        roleSuccess: "",
        roleError: "",
      };
    });
  }
  var saveUserRoleSettings = (userRoleData) => {
    const parameters = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRoleData),
    };
    fetch(Constants.USER_ROLE_URL + parseInt(input.userId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      });
    setID(input.userId);
  };
  function handleFetchById(event) {
    event.preventDefault();
    document.getElementById("userId").value = "";
    setSuccess(false);
    if (input.userId === "") {
      alert("User ID can not be blank!");
      return;
    } else if (isNaN(input.userId)) {
      alert("Only Digits are accepted");
      return;
    }
    fetch(Constants.USER_URL + parseInt(input.userId))
      .then((response) => response.json())
      .then(
        (jsonData) => {
          if (jsonData.success) {
            setInput({
              roleSuccess: jsonData.message,
              roleError: "",
            });
            var user = jsonData;
            var userId = JSON.stringify(user.userId);
            var firstName = JSON.stringify(user.firstName);
            var lastName = JSON.stringify(user.lastName);
            var userName = JSON.stringify(user.userName);
            var userRole = JSON.stringify(user.userRole);

            setInput((user) => {
              return {
                ...user,
                userId: JSON.parse(userId),
                firstName: JSON.parse(firstName),
                lastName: JSON.parse(lastName),
                userName: JSON.parse(userName),
                userRole: JSON.parse(userRole),
              };
            });
          } //end success
          else {
            setInput({
              roleSuccess: "",
              roleError: jsonData.message,
            });
          }
        } ////
      );
    // .catch(() => {
    //   setSuccess(false);
    //   alert(`The User, ${input.userId} does not exist in our database!`);
    //   return;
    // });
  }

  return (
    <div className="mt-4">
      <div className="row">
        <div class="col-xl-3"></div>
        <div class="col-xl-6 border pt-4 pb-4 shadow">
          <h4 class="card-title lead text-danger font-weight-bold">
            USER ROLE SETTINGS
          </h4>
          <hr></hr>
          <div class="form-group">
            <span className="badge badge-light text-dark">User ID</span>
            <div class="input-group shadow-sm mb-4">
              <input
                type="text"
                placeholder="Provide a User ID to update the user details"
                required
                autoComplete="off"
                className="form-control fetch-n-update-by-id-text"
                name="userId"
                id="userId"
                pattern="[0-9]"
                value={input.userId}
                onChange={handleChange}
              />
              <div class="input-group-append">
                <button
                  type="button"
                  name="fetch"
                  className="btn btn-danger fetch-n-update-by-id-btn#"
                  value="Fetch"
                  onClick={handleFetchById}
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <div class="form-group">
            <span className="badge badge-light text-dark">Full Name</span>
            <input
              type="text"
              className="shadow-sm form-control"
              autoComplete="off"
              name="fullName"
              value={input.firstName + " " + input.lastName}
              onChange={handleChange}
              disabled
            />
          </div>
          <div class="form-group">
            <span className="badge badge-light text-dark">User Name</span>
            <input
              type="text"
              className="shadow-sm form-control"
              autoComplete="off"
              name="userName"
              value={input.userName}
              onChange={handleChange}
              disabled
            />
          </div>
          <div class="form-group pb-3">
            <span className="badge badge-light text-dark">User Role</span>
            <div className="row mb-4">
              <div class="col-xl-5">
                <input
                  type="text"
                  className="shadow-sm form-control"
                  autoComplete="off"
                  name="userRole"
                  value={input.userRole}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div class="col-xl-2 text-center pt-1">
                <span className="badge badge-danger text-light shadow">
                  {" "}
                  TO{" "}
                </span>
              </div>
              <div class="col-xl-5">
                <select
                  className="custom-select shadow-sm form-control"
                  name="newRole"
                  value={input.newRole}
                  onChange={handleChange}
                  required
                >
                  <option selected>Set User Role</option>
                  <option>Admin</option>
                  <option>Project Manager</option>
                  <option>Product Owner</option>
                  <option>Developer</option>
                  <option>TriageMan</option>
                  <option>Tester</option>
                </select>
              </div>
            </div>
          </div>
          {/* <span onChange={handleChange} className="">
            {success && (
              <label
                className="alert alert-success p-0 d-flex justify-content-center"
                role="alert"
              >
                UserRole updation successful!
              </label>
            )}
          </span> */}
          {input.roleError ? (
            <label
              className="alert alert-danger p-0 d-flex justify-content-center"
              role="alert"
            >
              {input.roleError}{" "}
            </label>
          ) : null}
          {input.roleSuccess ? (
            <label
              className="alert alert-success p-0 d-flex justify-content-center"
              role="alert"
            >
              {input.roleSuccess}
            </label>
          ) : null}
          <button
            type="button"
            className="btn btn-danger btn-lg btn-block shadow"
            name="submit"
            value="UPDATE USER ROLE"
            onClick={handleUserRoleSubmit}
          >
            UPDATE USER ROLE
          </button>
        </div>
        <div class="col-xl-3"></div>
      </div>
      {/* END */}
    </div>
  );
};
export default UserRoleSettings;
