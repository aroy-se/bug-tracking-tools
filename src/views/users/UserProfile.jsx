import React from "react";
import user_profile_img from "../../assets/images/user_profile_img.jpg";
import * as Constants from "../../utility/Constants";
import { getFromStorage } from "../../utility/storage";
import Login from "../common/Login";

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
      // alert("Currently, No user logged in...");
      return;
    }
  }
  render() {
    const btt_local_storage_token = getFromStorage("btt_local_storage");
    if (btt_local_storage_token && btt_local_storage_token.token) {
      return (
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-xl-2"></div>
            <div className="col-xl-8">
              <div class="card rounded-0 shadow">
                <div class="card-header lead bg-danger text-light shadow rounded-0">
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
                    <ul
                      class="list-group list-group-flush text-left"
                      key={index}
                    >
                      <li class="list-group-item">
                        <div className="row">
                          <div className="col-xl-2">
                            <span className="badge badge-light lead text-danger font-weight-normal">
                              First Name
                            </span>
                          </div>
                          <div className="col-xl-10">
                            <span className="badge badge-light lead text-info font-weight-normal">
                              {user.firstName}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div className="row">
                          <div className="col-xl-2">
                            <span className="badge badge-light lead text-danger font-weight-normal">
                              Last Name
                            </span>
                          </div>
                          <div className="col-xl-10">
                            <span className="badge badge-light lead text-info font-weight-normal">
                              {user.lastName}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div className="row">
                          <div className="col-xl-2">
                            <span className="badge badge-light lead text-danger font-weight-normal">
                              Role
                            </span>
                          </div>
                          <div className="col-xl-10">
                            <span className="badge badge-light lead text-info font-weight-normal">
                              {user.userRole}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div className="row">
                          <div className="col-xl-2">
                            <span className="badge badge-light lead text-danger font-weight-normal">
                              Address
                            </span>
                          </div>
                          <div className="col-xl-10">
                            {" "}
                            <span className="badge badge-light lead text-info font-weight-normal">
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
                          <div className="col-xl-2">
                            <span className="badge badge-light lead text-danger font-weight-normal">
                              Email-ID
                            </span>
                          </div>
                          <div className="col-xl-10">
                            <span className="badge badge-light lead text-info font-weight-normal">
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </li>
                      <li class="list-group-item">
                        <div className="row">
                          <div className="col-xl-2">
                            <span className="badge badge-light lead text-danger font-weight-normal">
                              Phone Number
                            </span>
                          </div>
                          <div className="col-xl-10">
                            <span className="badge badge-light lead text-info font-weight-normal">
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
            <div className="col-xl-2"></div>
          </div>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default UserProfile;
