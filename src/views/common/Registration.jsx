import { Link } from "react-router-dom";
import React from "react";
import * as Constants from "../../utility/Constants";
// import reg_img from "../../assets/images/user_register.jpg";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      registrationError: "",
      registrationSuccess: "",

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
      userDetails: [],

      acceptCheckbox: true,
    };
    // this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeAddress1 = this.onChangeAddress1.bind(this);
    this.onChangeAddress2 = this.onChangeAddress2.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onChangeZip = this.onChangeZip.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);

    this.onClickRegistration = this.onClickRegistration.bind(this);
    this.onChangeAcceptCheckbox = this.onChangeAcceptCheckbox.bind(this);
  }
  onChangeAcceptCheckbox(event) {
    this.setState({
      acceptCheckbox: !this.state.acceptCheckbox,
    });
  }
  // onChangeUserName(event) {
  //   this.setState({
  //     userName: event.target.value,
  //   });
  // }
  onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  onChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
    // if (this.state.password !== event.target.value) {
    //   alert("Password does not match!");
    // }
  }
  onChangeFirstName(event) {
    this.setState({
      firstName: event.target.value,
    });
  }
  onChangeLastName(event) {
    this.setState({
      lastName: event.target.value,
    });
  }
  onChangeAddress1(event) {
    this.setState({
      address1: event.target.value,
    });
  }
  onChangeAddress2(event) {
    this.setState({
      address2: event.target.value,
    });
  }
  onChangeCity(event) {
    this.setState({
      city: event.target.value,
    });
  }
  onChangeState(event) {
    this.setState({
      state: event.target.value,
    });
  }
  onChangeZip(event) {
    this.setState({
      zip: event.target.value,
    });
  }
  onChangePhoto(event) {
    this.setState({
      photo: event.target.value,
    });
  }

  onChangeMobile(event) {
    this.setState({
      mobile: event.target.value,
    });
  }
  onClickRegistration() {
    // Grab state
    const {
      // userName,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      photo,

      mobile,
    } = this.state;

    // Post request to backend
    fetch("http://localhost:8765/btt/user/registration", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userName: userName,
        email: email,
        password: password,
        confirmPassword,
        firstName: firstName,
        lastName: lastName,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        photo: photo,
        mobile: mobile,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            registrationError: "",
            registrationSuccess: json.message,
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
        } else {
          this.setState({
            registrationSuccess: "",
            registrationError: json.message,
          });
        }
      });
  }
  render() {
    const {
      token,
      registrationError,
      registrationSuccess,
      // userName,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      address1,
      address2,
      city,
      state,
      zip,
      photo,
      mobile,
    } = this.state;

    console.log("Inside registration render Token: " + token);
    if (!token) {
      return (
        // <!-- START - Tag <div> for Main HTML body (Registration Details) -->
        <div class="container mt-5 mb-5">
          {/* Main single row */}
          <div class="row">
            <div class="col-xl-12">
              <div class="card shadow">
                <div class="card-header text-danger shadow-sm">
                  <i class="fas fa-user-plus">
                    <span className=" text-danger lead">
                      {" "}
                      USER REGISTRATION FORM
                    </span>
                  </i>
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
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  First Name
                                </h6>
                                <input
                                  type="text"
                                  className="user-first-name shadow-sm form-control"
                                  placeholder="First Name"
                                  required
                                  autoComplete="off"
                                  name="firstName"
                                  value={firstName}
                                  onChange={this.onChangeFirstName}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Username
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
                                  value={userName}
                                  onChange={this.onChangeUserName}
                                />
                              </div>
                            </td>
                          </tr> */}
                          {/* Email ID */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Email ID
                                </h6>
                                <input
                                  type="text"
                                  className="user-email shadow-sm form-control"
                                  name="email"
                                  value={email}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeEmail}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Password */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Password
                                </h6>
                                <input
                                  type="password"
                                  className="user-password shadow-sm form-control"
                                  required
                                  autoComplete="off"
                                  name="password"
                                  value={password}
                                  onChange={this.onChangePassword}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Address1 */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Address1
                                </h6>
                                <input
                                  type="text"
                                  className="user-address1 shadow-sm form-control"
                                  name="address1"
                                  value={address1}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeAddress1}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* City */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  City
                                </h6>
                                <input
                                  type="text"
                                  className="user-city shadow-sm form-control"
                                  name="city"
                                  value={city}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeCity}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Zip Code */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Zip Code
                                </h6>
                                <input
                                  type="text"
                                  className="user-zip shadow-sm form-control"
                                  name="zip"
                                  value={zip}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeZip}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Phone Number
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>Phone Number</h6>
                                <input
                                  type="text"
                                  className="user-mobile shadow-sm form-control"
                                  name="mobile"
                                  value={mobile}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeMobile}
                                />
                              </div>
                            </td>
                          </tr> */}
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
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Last Name
                                </h6>
                                <input
                                  type="text"
                                  className="user-last-name shadow-sm form-control"
                                  placeholder="Last Name"
                                  required
                                  autoComplete="off"
                                  name="lastName"
                                  value={lastName}
                                  onChange={this.onChangeLastName}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Phone Number */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Phone Number
                                </h6>
                                <input
                                  type="text"
                                  className="user-mobile shadow-sm form-control"
                                  name="mobile"
                                  value={mobile}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeMobile}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* Confirm Password */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Confirm Password
                                </h6>
                                <input
                                  type="password"
                                  className="user-password shadow-sm form-control"
                                  required
                                  autoComplete="off"
                                  name="confirmPassword"
                                  value={confirmPassword}
                                  onChange={this.onChangeConfirmPassword}
                                />
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  Address2
                                </h6>
                                <input
                                  type="text"
                                  className="user-address2 shadow-sm form-control"
                                  name="address2"
                                  value={address2}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeAddress2}
                                />
                              </div>
                            </td>
                          </tr>
                          {/* State */}
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>
                                  <i class="fas fa-asterisk text-danger fa-xs"></i>{" "}
                                  State
                                </h6>
                                <select
                                  name="state"
                                  className="custom-select user-state shadow-sm form-control"
                                  value={state}
                                  required
                                  onChange={this.onChangeState}
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
                          {/* Email ID
                          <tr>
                            <td>
                              <div class="form-group">
                                <h6>Email ID</h6>
                                <input
                                  type="text"
                                  className="user-email shadow-sm form-control"
                                  name="email"
                                  value={email}
                                  required
                                  autoComplete="off"
                                  onChange={this.onChangeEmail}
                                />
                              </div>
                            </td>
                          </tr> */}
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
                                    value={photo}
                                    onChange={this.onChangePhoto}
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="attachment"
                                  >
                                    {photo}
                                  </label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="mb-5">
                        <p className="text-muted font-weight-lighter">
                          <small>
                            In addition, We respects your desire for privacy.
                            Personal data collected from this program will not
                            be sold, given or shared with organizations external
                            to our Company. We will use this data for
                            communications with you to clarify issues regarding
                            the report you submitted and/or status of that
                            report. The issues that you report may be made
                            publicly available, however your personal data will
                            be kept confidential. If you are not comfortable
                            with the above conditions, please do not press the
                            Submit button.
                          </small>
                        </p>
                        <div class="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            class="custom-control-input"
                            id="acceptCheckbox"
                            value={this.state.acceptCheckbox}
                            onChange={this.onChangeAcceptCheckbox}
                          />
                          <label
                            class="custom-control-label font-italic font-weight-normal text-secondary"
                            for="acceptCheckbox"
                          >
                            Check here to indicate that you have read and agree
                            to the terms of our Service
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End of reg input details */}
                  <div class="row mb-4">
                    <div class="col-xl-3"></div>
                    <div class="col-xl-6">
                      {registrationError ? (
                        <label
                          className="alert alert-danger p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          {registrationError}{" "}
                        </label>
                      ) : null}
                      {registrationSuccess ? (
                        <label
                          className="alert alert-success p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          {registrationSuccess}
                          {/* <Link to="/login">
                              Click here to Login
                          </Link> */}
                          {/* {"and logged in to your account "} */}
                        </label>
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-danger btn-lg btn-block shadow"
                        name="submit"
                        value="REGISTER"
                        disabled={this.state.acceptCheckbox}
                        onClick={this.onClickRegistration}
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
    }
  }
}

export default Registration;
