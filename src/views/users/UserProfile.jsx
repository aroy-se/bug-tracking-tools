import React from "react";
import user_profile_img from "../../assets/images/user_profile_img.jpg";
import * as Constants from "../../utility/Constants";
import { getFromStorage } from "../../utility/storage";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
    };
  }
  componentDidMount() {
    const local_storage_user = getFromStorage("btt_current_user");
    if (local_storage_user && local_storage_user.user) {
      const { user } = local_storage_user;
      fetch(Constants.URL_USER_BY_EXACT_EMAIL + user)
        .then((response) => response.json())
        .then((data) => {
          this.setState({ userDetails: data });
        });
    } else {
      alert("Currently, No user logged in...");
      return;
    }
  }
  render() {
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-6">
            <div class="card shadow">
              <div class="card-header lead bg-danger text-light shadow">
                User Profile
              </div>
              <div className="card-body text-center">
                <img
                  src={user_profile_img}
                  alt="Card image"
                  style={{ width: 200, height: 200 }}
                  className="shadow"
                />
              </div>
              <div class="card-body text-center">
                {this.state.userDetails.map((user, index) => (
                  <ul class="list-group list-group-flush text-left" key={index}>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-xl-4">
                          <span className="badge badge-light lead text-danger font-weight-normal">
                            First Name
                          </span>
                        </div>
                        <div className="col-xl-8">
                          <span className="badge badge-light lead text-info font-weight-bold">
                            {user.firstName}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-xl-4">
                          <span className="badge badge-light lead text-danger font-weight-normal">
                            Last Name
                          </span>
                        </div>
                        <div className="col-xl-8">
                          <span className="badge badge-light lead text-info font-weight-bold">
                            {user.lastName}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-xl-4">
                          <span className="badge badge-light lead text-danger font-weight-normal">
                            Address
                          </span>
                        </div>
                        <div className="col-xl-8">
                          {" "}
                          <span className="badge badge-light lead text-info font-weight-bold">
                            {user.address1 +
                              ", " +
                              user.address2 +
                              ", " +
                              user.city +
                              ", " +
                              user.state +
                              ", " +
                              user.zip}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-xl-4">
                          <span className="badge badge-light lead text-danger font-weight-normal">
                            Email-ID
                          </span>
                        </div>
                        <div className="col-xl-8">
                          <span className="badge badge-light lead text-info font-weight-bold">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div className="row">
                        <div className="col-xl-4">
                          <span className="badge badge-light lead text-danger font-weight-normal">
                            Phone Number
                          </span>
                        </div>
                        <div className="col-xl-8">
                          <span className="badge badge-light lead text-info font-weight-bold">
                            {user.mobile}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                ))}
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
