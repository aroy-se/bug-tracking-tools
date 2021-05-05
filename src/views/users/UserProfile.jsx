import React from "react";
import user_profile_img from "../../assets/images/user_profile_img.jpg";
import * as Constants from "../../utility/Constants";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
    };
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
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-6">
            <div class="card shadow">
              <div class="card-header  bg-danger text-light">User Profile</div>
              <div className="card-body text-center">
                <img
                  src={user_profile_img}
                  alt="Card image"
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <div class="card-body text-center">
                <p class="card-text">
                  <u>User details</u>
                </p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <label>First Name</label>
                    {/* {userDetails.firstName} */}
                  </li>
                  <li class="list-group-item">
                    <label>Last Name</label>
                  </li>
                  <li class="list-group-item">
                    <label>Address</label>
                  </li>
                  <li class="list-group-item">
                    <label>Email-ID</label>
                  </li>
                  <li class="list-group-item">
                    <label>Phone Number</label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xl-3"></div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
