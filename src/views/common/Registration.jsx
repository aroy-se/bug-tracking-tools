import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
import reg_img from "../../assets/images/user_register.jpg";

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
    <div className="registration_main" border="0">
      <form>
        <table className="registration_table">
          <tr>
            <td>
              <img
                src={reg_img}
                height="110"
                width="110"
                alt="Registration"
                className="reg-img"
              />
            </td>
            <td>
              <h3 className="reg-label">USER REGISTRATION FORM</h3>
            </td>
          </tr>
          <tr>
            <td>
              {/* <!-- kept it blank as not required --> */}
              <label></label>
            </td>
            <td>
              <input type="radio" name="salutation" checked /> Mr.
              <input type="radio" name="salutation" /> Mrs.
              <input type="radio" name="salutation" /> Ms.
            </td>
          </tr>
          <tr>
            <td>
              <label>First Name</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="First Name"
                required
                autoComplete="off"
                name="firstName"
                value={input.firstName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Last Name</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Last Name"
                required
                autoComplete="off"
                name="lastName"
                value={input.lastName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Username</label>
            </td>
            <td>
              <input
                type="text"
                placeholder="Username"
                required
                autoComplete="off"
                name="userName"
                value={input.userName}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Password</label>
            </td>
            <td>
              <input
                type="password"
                placeholder="Password"
                required
                autoComplete="off"
                name="password"
                value={input.password}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Mail Address1</label>
            </td>
            <td>
              <input
                type="text"
                name="address1"
                value={input.address1}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Mail Address2</label>
            </td>
            <td>
              <input
                type="text"
                name="address2"
                value={input.address2}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>City</label>
            </td>
            <td>
              <input
                type="text"
                name="city"
                value={input.city}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>State</label>
            </td>
            <td>
              <select name="state" value={input.state} onChange={handleChange}>
                <option>--- Select One State ---</option>
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
            </td>
          </tr>
          <tr>
            <td>
              <label>Zip</label>
            </td>
            <td>
              <input
                type="text"
                name="zip"
                value={input.zip}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>E-Mail</label>
            </td>
            <td>
              <input
                type="text"
                name="email"
                value={input.email}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Mobile</label>
            </td>
            <td>
              <input
                type="tel"
                name="mobile"
                value={input.mobile}
                placeholder="+91"
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <label>Upload Photo</label>
            </td>
            <td>
              <input
                type="file"
                name="photo"
                value={input.photo}
                required
                autoComplete="off"
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
              <label className="insert-status-label" onChange={handleChange}>
                {success &&
                  "The User details has been registered successfully!"}
              </label>
            </td>
          </tr>
          <tr>
            <td>
              <label></label>
            </td>
            <td className="register-btn-col">
              <input
                type="submit"
                className="register"
                name="submit"
                value="REGISTER"
                onClick={handleSubmit}
              />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default Registration;
