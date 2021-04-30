import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
// import reg_img from "../../assets/images/user_register.jpg";

const Registration = () => {
  // To show status message after successful insertion
  const [success, setSuccess] = useState(false);
  const initialState = {
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
  };

  const [input, setInput] = useState(initialState);
  // Handle function
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
  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      userId: Math.floor(Math.random() * (99999 - 100) + 100), // Just demo purpose
      userName: input.userName,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
      role: Constants.USER_ROLE,
      address1: input.address1,
      address2: input.address2,
      city: input.city,
      state: input.state,
      zip: input.zip,
      photo: input.photo,
      email: input.email,
      mobile: input.mobile,
    };
    saveUserDetails(newUser);
    // resetting the form fields after successful insertion
    setInput((prevState) => {
      return {
        ...prevState,
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
      };
    });
  }

  var saveUserDetails = (userData) => {
    const parameters = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch(Constants.URL, parameters)
      .then((response) => response.json())
      .then((userData) => {
        setSuccess(true);
      });
  };
  return (
    // <!-- START - Tag <div> for Main HTML body (Registration Details) -->
    <div class="container mt-5 mb-5">
      {/* Main single row */}
      <div class="row">
        <div class="col-xl-12">
          <div class="card">
            <div class="card-header text-danger">
              <h4>USER REGISTRATION FORM</h4>
            </div>
            <div class="card-body">
              <div class="row">
                {/* 1st col */}
                <div class="col-xl-6">
                  <table class="table table-borderless">
                    <tbody>
                      {/* First Name */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>First Name</h6>
                            <input
                              type="text"
                              className="user-first-name shadow-sm form-control"
                              placeholder="First Name"
                              required
                              autoComplete="off"
                              name="firstName"
                              value={input.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Username */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Username</h6>
                            <input
                              type="text"
                              className="user-username shadow-sm form-control"
                              required
                              autoComplete="off"
                              name="userName"
                              value={input.userName}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Address1 */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Address1</h6>
                            <input
                              type="text"
                              className="user-address1 shadow-sm form-control"
                              name="address1"
                              value={input.address1}
                              required
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* City */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>City</h6>
                            <input
                              type="text"
                              className="user-city shadow-sm form-control"
                              name="city"
                              value={input.city}
                              required
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Zip Code */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Zip Code</h6>
                            <input
                              type="text"
                              className="user-zip shadow-sm form-control"
                              name="zip"
                              value={input.zip}
                              required
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Phone Number */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Phone Number</h6>
                            <input
                              type="text"
                              className="user-mobile shadow-sm form-control"
                              name="mobile"
                              value={input.mobile}
                              required
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 2nd col */}
                <div class="col-xl-6">
                  <table class="table table-borderless">
                    <tbody>
                      {/* Last Name */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Last Name</h6>
                            <input
                              type="text"
                              className="user-last-name shadow-sm form-control"
                              placeholder="Last Name"
                              required
                              autoComplete="off"
                              name="lastName"
                              value={input.lastName}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* Password */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Password</h6>
                            <input
                              type="text"
                              className="user-password shadow-sm form-control"
                              required
                              autoComplete="off"
                              name="password"
                              value={input.password}
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Address2</h6>
                            <input
                              type="text"
                              className="user-address2 shadow-sm form-control"
                              name="address2"
                              value={input.address2}
                              required
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* State */}
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>State</h6>
                            <select
                              name="state"
                              className="custom-select user-state shadow-sm form-control"
                              value={input.state}
                              required
                              onChange={handleChange}
                            >
                              <option>Select One State</option>
                              <option>Andhra Pradesh</option>
                              <option>Arunachal Pradesh</option>
                              <option>Assam</option>
                              <option>Bihar</option>
                              <option>Chhattisgarh</option>
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
                      <tr>
                        <td>
                          <div class="form-group">
                            <h6>Email ID</h6>
                            <input
                              type="text"
                              className="user-email shadow-sm form-control"
                              name="email"
                              value={input.email}
                              required
                              autoComplete="off"
                              onChange={handleChange}
                            />
                          </div>
                        </td>
                      </tr>
                      {/* User Photo */}
                      <tr>
                        <td>
                          <div class="form-group ">
                            <h6>User Photo (Max Limit: 500KB)</h6>
                            <div className="custom-file">
                              <input
                                type="file"
                                name="photo"
                                id="attachment"
                                className="custom-file-input form-control"
                                required
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
                        The Record has been updated successfully!
                      </label>
                    )}
                  </span>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg btn-block"
                    name="submit"
                    value="REGISTER"
                    onClick={handleSubmit}
                  >
                    REGISTER
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

export default Registration;
