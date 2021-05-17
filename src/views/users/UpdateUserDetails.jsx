import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
import update_img from "../../assets/images/user_register.jpg";

const UpdateUserDetails = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState("");
  const [input, setInput] = useState({
    userId: "",
    // userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    photo: "",
    mobile: "",
  });

  // Handle function
  function handleChange(event) {
    // reset the status label
    setSuccess(false);
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  function onChangeConfirmPassword(event) {
    setInput((prevInput) => {
      return {
        ...prevInput,
        confirmPassword: event.target.value,
      };
    });
  }
  function handleFetchById(event) {
    event.preventDefault();
    if (input.userId === "") {
      alert("User-Id field should not be empty!");
      return;
    }
    // else if (isNaN(input.userId)) {
    //   alert("Only digits are accepted");
    //   return;
    // }
    fetch(Constants.USER_URL + parseInt(input.userId))
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data).length > 0) {
          var user = data;
          // var username = JSON.stringify(user.userName);
          var email = JSON.stringify(user.email);
          var password = JSON.stringify(user.password);
          var firstName = JSON.stringify(user.firstName);
          var lastName = JSON.stringify(user.lastName);
          var address1 = JSON.stringify(user.address1);
          var address2 = JSON.stringify(user.address2);
          var city = JSON.stringify(user.city);
          var state = JSON.stringify(user.state);
          var zip = JSON.stringify(user.zip);
          // var photo = JSON.stringify(user.photo);

          var mobile = JSON.stringify(user.mobile);
          setInput((user) => {
            return {
              ...user,
              // userName: JSON.parse(username),
              email: JSON.parse(email),
              password: JSON.parse(password),
              firstName: JSON.parse(firstName),
              lastName: JSON.parse(lastName),
              address1: JSON.parse(address1),
              address2: JSON.parse(address2),
              city: JSON.parse(city),
              state: JSON.parse(state),
              zip: JSON.parse(zip),
              // photo: JSON.parse(photo),
              mobile: JSON.parse(mobile),
            };
          });
        } else {
          setSuccess(false);
          alert(`The search input does not exist in our database`);
        }
      });
  }
  function handleSubmit(event) {
    event.preventDefault();
    // pwd and confirm pwd are same or not
    // if (input.password !== input.confirmPassword) {
    //   alert("Error: Password and Confirm Password must be matched");
    //   return;
    // }
    const userUpdateObject = {
      userId: input.userId,
      // userName: input.userName,
      email: input.email,
      // password: input.password,
      // password: input.confirmPassword,
      firstName: input.firstName,
      lastName: input.lastName,
      address1: input.address1,
      address2: input.address2,
      city: input.city,
      state: input.state,
      zip: input.zip,
      photo: input.photo,
      mobile: input.mobile,
    };
    setId(userUpdateObject.userId);
    saveUserDetails(userUpdateObject);
    // resetting the form fields after successful updation
    // document.getElementById("userId").value = "";
    setInput((prevState) => {
      return {
        ...prevState,
        userId: "",
        // userName: "",
        password: "",
        confirmPassword: "",
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
      };
    });
  }
  var saveUserDetails = (userData) => {
    const parameters = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch(Constants.USER_URL + parseInt(input.userId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
        alert(`The search input does not exist in our database`);
      });
    document.getElementById("userId").value = "";
  };
  return (
    // <!-- START - Tag <div> for Main HTML body (Registration Details) -->
    <div class="container">
      {/* Main single row */}
      <div class="row">
        <div class="col-xl-12">
          <div class="card shadow">
            <div class="card-header text-danger shadow-sm pt-2 pb-1">
              <h4 className="lead font-weight-bold">UPDATE USER DETAILS</h4>
            </div>
            <div class="card-body">
              {/* 1st col */}
              <div class="row mb-0">
                <div class="col-xl-3">
                  <img
                    className="img-thumbnail border-0 ml-2"
                    alt="btt-home-img"
                    src={update_img}
                    style={{ width: 100, height: 100 }}
                  />
                </div>
                <div class="col-xl-6">
                  <table class="table table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>User ID</h6>
                            <div class="input-group shadow-lg">
                              <input
                                type="text"
                                placeholder="Provide a User ID to update the user details"
                                required
                                autoComplete="off"
                                className="form-control fetch-n-update-by-id-text"
                                name="userId"
                                id="userId"
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-xl-3"></div>
              </div>
              <div class="row mt-0">
                {/* 2nd col */}
                <div class="col-xl-6">
                  <table class="table table-borderless">
                    <tbody>
                      {/* First Name */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>First Name</h6>
                            <input
                              type="text"
                              className="update-first-name shadow-sm form-control"
                              autoComplete="off"
                              name="firstName"
                              value={input.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Username */}
                      {/* <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Username</h6>
                            <input
                              type="text"
                              className="update-username shadow-sm form-control"
                              autoComplete="off"
                              name="userName"
                              value={input.userName}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr> */}
                      {/* Email ID */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Email ID</h6>
                            <input
                              type="text"
                              className="update-email shadow-sm form-control"
                              name="email"
                              value={input.email}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Password */}
                      {/* <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Password</h6>
                            <input
                              type="password"
                              className="update-password shadow-sm form-control"
                              autoComplete="off"
                              name="password"
                              value={input.password}
                              onChange={handleChange}
                              disabled
                            />
                          </div>
                        </td>
                      </tr> */}
                      {/* Address1 */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Address1</h6>
                            <input
                              type="text"
                              className="update-address1 shadow-sm form-control"
                              name="address1"
                              value={input.address1}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* City */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>City</h6>
                            <input
                              type="text"
                              className="update-city shadow-sm form-control"
                              name="city"
                              value={input.city}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Zip Code */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Zip Code</h6>
                            <input
                              type="text"
                              className="update-zip shadow-sm form-control"
                              name="zip"
                              value={input.zip}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Phone Number */}
                      {/* <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Phone Number</h6>
                            <input
                              type="text"
                              className="update-mobile shadow-sm form-control"
                              name="mobile"
                              value={input.mobile}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>

                {/* 3rd col */}
                <div class="col-xl-6">
                  <table class="table table-borderless">
                    <tbody>
                      {/* Last Name */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Last Name</h6>
                            <input
                              type="text"
                              className="update-last-name shadow-sm form-control"
                              placeholder="Last Name"
                              autoComplete="off"
                              name="lastName"
                              value={input.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Phone Number */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Phone Number</h6>
                            <input
                              type="text"
                              className="update-mobile shadow-sm form-control"
                              name="mobile"
                              value={input.mobile}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Confirm Password */}
                      {/* <tr>
                        <td>
                          <div class="form-group">
                            <h6>Confirm Password</h6>
                            <input
                              type="password"
                              className="user-password shadow-sm form-control"
                              required
                              autoComplete="off"
                              name="confirmPassword"
                              value={input.confirmPassword}
                              onChange={onChangeConfirmPassword}
                              disabled
                            />
                          </div>
                        </td>
                      </tr> */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Address2</h6>
                            <input
                              type="text"
                              className="update-address2 shadow-sm form-control"
                              name="address2"
                              value={input.address2}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* State */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>State</h6>
                            <select
                              name="state"
                              className="custom-select update-state shadow-sm form-control"
                              value={input.state}
                              onChange={handleChange}
                            >
                              <option>Select One State</option>
                              <option>Andhra Pradesh</option>
                              <option>Arunachal Pradesh</option>
                              <option>Assam</option>
                              <option>Bihar</option>
                              <option>Chhattisgarh</option>
                              <option>Delhi</option>
                              <option>Goa</option>
                              <option>Gujarat</option>
                              <option>Haryana</option>
                              <option>Himachal Pradesh</option>
                              <option>Jharkhand</option>
                              <option>Karnataka</option>
                              <option>Kerala</option>
                              <option>Madhya Pradesh</option>
                              <option>Maharashtra</option>
                              <option>Manipur</option>
                              <option>Meghalaya</option>
                              <option>Mizoram</option>
                              <option>Nagaland</option>
                              <option>Odisha</option>
                              <option>Punjab</option>
                              <option>Rajasthan</option>
                              <option>Sikkim</option>
                              <option>Tamil Nadu</option>
                              <option>Telangana</option>
                              <option>Tripura</option>
                              <option>Uttar Pradesh</option>
                              <option>Uttarakhand</option>
                              <option>West Bengal</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      {/* Email ID */}
                      {/* <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>Email ID</h6>
                            <input
                              type="text"
                              className="update-email shadow-sm form-control"
                              name="email"
                              value={input.email}
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr> */}
                      {/* User Photo */}
                      <tr>
                        <td>
                          <div class="form-group  p-0 m-0">
                            <h6>User Photo (Max Limit: 500KB)</h6>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="photo"
                                id="attachment"
                                className="custom-file-input form-control"
                                autoComplete="off"
                                value={input.photo}
                                onChange={handleChange}
                              />
                              <label class="custom-file-label" for="attachment">
                                {input.photo}
                              </label>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* End of reg input details */}
              <div class="row mb-4">
                <div class="col-xl-3"></div>
                <div class="col-xl-6">
                  <span onChange={handleChange}>
                    {success && (
                      <label
                        className="alert alert-success p-0 d-flex justify-content-center"
                        role="alert"
                      >
                        The UserId={id} has been updated successfully!
                      </label>
                    )}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block shadow"
                    name="submit"
                    value="UPDATE"
                    onClick={handleSubmit}
                  >
                    UPDATE USER
                  </button>
                </div>
                <div class="col-xl-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
