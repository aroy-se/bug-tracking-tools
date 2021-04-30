import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
import update_img from "../../assets/images/user_register.jpg";

const UpdateUserDetails = () => {
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
    // reset the status label
    setSuccess(false);
  }
  function handleFetchById(event) {
    event.preventDefault();
    fetch(Constants.URL + parseInt(input.userId))
      .then((response) => response.json())
      .then((data) => {
        var user = data;
        var username = JSON.stringify(user.userName);
        var password = JSON.stringify(user.password);
        var firstName = JSON.stringify(user.firstName);
        var lastName = JSON.stringify(user.lastName);
        var address1 = JSON.stringify(user.address1);
        var address2 = JSON.stringify(user.address2);
        var city = JSON.stringify(user.city);
        var state = JSON.stringify(user.state);
        var zip = JSON.stringify(user.zip);
        // var photo = JSON.stringify(user.photo);
        var email = JSON.stringify(user.email);
        var mobile = JSON.stringify(user.mobile);
        setInput((user) => {
          return {
            ...user,
            userName: JSON.parse(username),
            password: JSON.parse(password),
            firstName: JSON.parse(firstName),
            lastName: JSON.parse(lastName),
            address1: JSON.parse(address1),
            address2: JSON.parse(address2),
            city: JSON.parse(city),
            state: JSON.parse(state),
            zip: JSON.parse(zip),
            // photo: JSON.parse(photo),
            email: JSON.parse(email),
            mobile: JSON.parse(mobile),
          };
        });
      });
  }
  // function setText(user) {}
  function handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      userId: input.userId,
      userName: input.userName,
      password: input.password,
      firstName: input.firstName,
      lastName: input.lastName,
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
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    fetch(Constants.URL + parseInt(input.userId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      });
  };
  return (
    <div className="dashboard-details">
      <div className="registration_main">
        <form>
          <table className="registration_table" border="0">
            <tr>
              <td>
                <img src={update_img} alt="Registration" className="reg-img" />
              </td>
              <td>
                <h3 className="reg-label">UPDATE USER DETAILS</h3>
              </td>
            </tr>
            {/* <tr>
              <td>
                <!-- kept it blank as not required -->
                <label></label>
              </td>
              <td>
                <input type="radio" name="salutation" checked /> Mr.
                <input type="radio" name="salutation" /> Mrs.
                <input type="radio" name="salutation" /> Ms.
              </td>
            </tr> */}
            <tr>
              <td>
                <label>User ID</label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Provide User ID to update details"
                  required
                  autoComplete="off"
                  className="fetch-n-update-by-id-text"
                  name="userId"
                  value={input.userId}
                  onChange={handleChange}
                />
                <input
                  type="button"
                  className="fetch-n-update-by-id-btn"
                  name="fetch"
                  value="Fetch"
                  onClick={handleFetchById}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>First Name</label>
              </td>
              <td>
                <input
                  type="text"
                  // placeholder="First Name"
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
                  // placeholder="Last Name"
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
                  // placeholder="Username"
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
                  // placeholder="Password"
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
                <select
                  name="state"
                  value={input.state}
                  onChange={handleChange}
                >
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
                  autoComplete="off"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>User Photo</label>
              </td>
              <td>
                <input
                  type="file"
                  name="photo"
                  className="photo"
                  value={input.photo}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <label className="insert-status-label" onChange={handleChange}>
                  {success && "The record has been updated successfully!"}
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
                  value="UPDATE"
                  onClick={handleSubmit}
                />
              </td>
            </tr>
          </table>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserDetails;
