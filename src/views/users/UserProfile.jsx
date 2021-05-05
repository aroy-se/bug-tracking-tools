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
              <div class="card-header lead bg-danger text-light">
                User Profile
              </div>
              <div className="card-body text-center">
                <img
                  src={user_profile_img}
                  alt="Card image"
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <div class="card-body text-center">
                {/* <p class="card-text">
                  <u>User details</u>
                </p> */}
                <ul class="list-group list-group-flush text-left">
                  <li class="list-group-item">
                    <span className="badge badge-light text-secondary mr-5">
                      First Name
                    </span>
                    <label>Anonymous</label>
                  </li>
                  <li class="list-group-item">
                    <span className="badge badge-light text-secondary mr-5">
                      Last Name
                    </span>
                    <label>Anonymous</label>
                  </li>
                  <li class="list-group-item">
                    <span className="badge badge-light text-secondary mr-5">
                      Address
                    </span>
                    <label>NA</label>
                  </li>
                  <li class="list-group-item">
                    <span className="badge badge-light text-secondary mr-5">
                      Email-ID
                    </span>
                    <label>info@btt.com</label>
                  </li>
                  <li class="list-group-item">
                    <span className="badge badge-light text-secondary mr-5">
                      Phone Number
                    </span>
                    <label>+91-7676767676</label>
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
