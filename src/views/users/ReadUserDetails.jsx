import React, { Component } from "react";
import * as Constants from "../../utility/Constants";

class ReadUserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { userDetails: [] };
  }
  componentDidMount() {
    fetch(Constants.URL)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ userDetails: data });
      });
  }
  render() {
    return (
      // <div className="dashboard-details">
      //   <table className="user-table">
      <div className="table-wrapper-scroll-y component-table-responsive">
        <table className="table table-sm table-hover border">
          <thead class="thead-light">
            <tr>
              <th>ID</th>
              <th>Name</th>
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
          {this.state.userDetails.map((user, index) => (
            <tr key={index}>
              <td>{user.userId}</td>
              <td>
                {user.firstName} {user.lastName}
              </td>
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
  }
}

export default ReadUserDetails;
