import React, { useState } from "react";
import * as Constants from "../../utility/Constants";

const ReadUserDetailsById = () => {
  const [input, setInput] = useState({
    userId: "",
  });
  const [userDetails, setUserDetails] = useState([]);

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
    fetch(Constants.URL + parseInt(input.userId))
      .then((response) => response.json())
      .then((data) => {
        setUserDetails((userDetails) => [...userDetails, data]);
      });
  }

  return (
    <div className="dashboard-details">
      <div className="fetch-by-id-outer">
        {/* <label>SEARCH BY USER ID</label> */}
        <input
          type="text"
          className="fetch-by-id-text"
          placeholder="User ID"
          required
          autoComplete="off"
          name="userId"
          value={input.userId}
          onChange={handleChange}
        />
        <input
          type="submit"
          className="fetch-by-id-btn"
          name="submit"
          value="FETCH"
          onClick={handleSubmit}
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Password</th>
            <th>Role</th>
            <th>Address-1</th>
            <th>Address-2</th>
            <th>City</th>
            <th>State</th>
            <th>Zip</th>
            <th>Photo</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        {userDetails.map((user, index) => (
          <tr key={index}>
            <td>{user.userId}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.userName}</td>
            <td>{user.password}</td>
            <td>{user.role}</td>
            <td>{user.address1}</td>
            <td>{user.address2}</td>
            <td>{user.city}</td>
            <td>{user.state}</td>
            <td>{user.zip}</td>
            <td>{user.photo}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
// }

export default ReadUserDetailsById;
