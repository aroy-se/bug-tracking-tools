import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import brand_img from "../../assets/images/bug64.jpg";
import "../../assets/css/btt-style.css";
import SearchBug from "../bugs/SearchBug";
import { setInStorage, getFromStorage } from "../../utility/storage";
import HomeInternalDashboard from "./HomeInternalDashBoard";
import * as Constants from "../../utility/Constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", authStat: false, userRole: "" };
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onClickFetchUserEmail = this.onClickFetchUserEmail.bind(this);
  }
  componentDidMount() {
    this.onClickLogin();
  }
  onClickFetchUserEmail() {
    const btt_current_user_email = getFromStorage("btt_current_user");
    if (btt_current_user_email && btt_current_user_email.user) {
      fetch(Constants.URL_USER_BY_EXACT_EMAIL + btt_current_user_email.user)
        .then((response) => response.json())
        .then((data) => {
          // this.onClickLogin();
          // console.log("onClickFetchUserEmail: " + JSON.stringify(data));
          data.map((user) => {
            this.setState({ userRole: user.userRole });
            // setInStorage("btt_current_user_role", { userRole: user.userRole });
          });
        });
      setInStorage("btt_current_user_role", { userRole: this.state.userRole });
    } else {
      // alert("Currently, No user logged in...");
      return;
    }
  }
  onClickLogin() {
    const btt_local_storage_token = getFromStorage("btt_local_storage");
    if (btt_local_storage_token && btt_local_storage_token.token) {
      const { token } = btt_local_storage_token;
      // Verify token
      fetch("http://localhost:8765/btt/user/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            // alert(JSON.stringify(json.data));
            this.onClickFetchUserEmail();
            this.setState({
              token,
              authStat: true,
            });

            // alert("Header usersessions Token: Success >> " + token);
          } else {
            // alert("else Token: " + JSON.stringify(json));
            this.setState({
              token: "",
              authStat: false,
            });
          }
        });
    } else {
      // alert("outer else Token: ");
      this.setState({
        token: "",
        authStat: false,
      });
    }
  }
  render() {
    return (
      <div className="">
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="form-inline d-flex justify-content-between w-100">
              <ul className="navbar-nav ">
                <li>
                  <Link
                    to="/"
                    className="navbar-brand font-weight-bold text-danger"
                  >
                    <img
                      src={brand_img}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                      alt="btt-brand"
                    />{" "}
                    Bug Tracking Tools
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ">
                <li className="nav-item border-1">
                  <div className="form-group mr-2">
                    <div className="input-group">
                      {/* Bug SEARCH ENGINE */}
                      <SearchBug />
                    </div>
                  </div>
                </li>
              </ul>
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <div className="nav-item">
                    <Link className="nav-link text-danger" to="/viewFaq">
                      FAQ
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-item">
                    <Link to="/about" className="nav-link text-danger">
                      About
                    </Link>
                  </div>
                </li>

                <li className="nav-item">
                  {/* Dropdown list */}
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-light rounded-0"
                      onClick={this.onClickLogin}
                    >
                      {getFromStorage("btt_current_user") &&
                      getFromStorage("btt_current_user").user !== "" ? (
                        /////////////
                        this.state.userRole === Constants.ADMIN ? (
                          <i class="fas fa-user-shield">
                            {" "}
                            {getFromStorage("btt_current_user").user}
                          </i>
                        ) : this.state.userRole ===
                          Constants.PROJECT_MANAGER ? (
                          <i class="fas fa-user-secret text-info">
                            {" "}
                            {getFromStorage("btt_current_user").user}
                          </i>
                        ) : (
                          <i class="far fa-user text-info ">
                            {" "}
                            {getFromStorage("btt_current_user").user}
                          </i>
                        )
                      ) : (
                        <span class="fas fa-user-slash text-secondary">
                          {" "}
                          {Constants.ANONYMOUS_USER}
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      class="btn btn-light dropdown-toggle dropdown-toggle-split rounded-0"
                      onClick={this.onClickLogin}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right rounded-0">
                      <Link
                        to="/userProfile"
                        className="text-info dropdown-item"
                      >
                        <i className="fas fa-user-circle text-info">
                          {" "}
                          User Profile
                        </i>
                      </Link>
                      {getFromStorage("btt_local_storage") &&
                      getFromStorage("btt_local_storage").token === "" ? (
                        <Link
                          to="/login"
                          className="text-secondary dropdown-item"
                          onClick={this.onClickLogin}
                        >
                          <i className="fas fa-sign-in-alt text-secondary">
                            {" "}
                            Login
                          </i>
                        </Link>
                      ) : (
                        <Link
                          to="/logout"
                          className="text-secondary dropdown-item"
                          onClick={this.onClickLogin}
                        >
                          <i className="fas fa-sign-out-alt text-secondary">
                            {" "}
                            Logout
                          </i>
                        </Link>
                      )}

                      {getFromStorage("btt_local_storage") &&
                      getFromStorage("btt_local_storage").token !== "" ? (
                        // token available => show internal dropdownList
                        <>
                          {
                            (getFromStorage("btt_current_user_role")
                              .userRole === ""
                              ? this.onClickFetchUserEmail()
                              : console.log(
                                  getFromStorage("btt_current_user_role")
                                    .userRole
                                ),
                            getFromStorage("btt_current_user_role").userRole !==
                            Constants.END_USER ? (
                              <>
                                <div class="dropdown-divider"></div>
                                <Link
                                  to="/userDashboard"
                                  className="text-secondary dropdown-item"
                                >
                                  <i className="fas fa-users">
                                    {" "}
                                    User Dashboard
                                  </i>
                                </Link>
                                <Link
                                  to="/bugDashboard"
                                  className="text-secondary dropdown-item"
                                >
                                  <i className="fas fa-bug"> Bug Dashboard</i>
                                </Link>
                              </>
                            ) : null)
                          }
                        </>
                      ) : // no token
                      null}
                      {/* PM Only */}
                      {getFromStorage("btt_local_storage") &&
                      getFromStorage("btt_local_storage").token !== "" ? (
                        getFromStorage("btt_current_user_role").userRole ===
                          Constants.ADMIN ||
                        getFromStorage("btt_current_user_role").userRole ===
                          Constants.PROJECT_MANAGER ? (
                          <>
                            <Link
                              to="/viewNewFeatureRequestList"
                              className="text-secondary dropdown-item"
                            >
                              <i class="fas fa-plus-square">
                                {" "}
                                Feature Dashboard
                              </i>
                            </Link>
                          </>
                        ) : null
                      ) : null}
                      {/* Create FAQ Only for developer */}
                      {getFromStorage("btt_local_storage") &&
                      getFromStorage("btt_local_storage").token !== "" ? (
                        getFromStorage("btt_current_user_role").userRole ===
                          Constants.ADMIN ||
                        getFromStorage("btt_current_user_role").userRole ===
                          Constants.PROJECT_MANAGER ||
                        getFromStorage("btt_current_user_role").userRole ===
                          Constants.DEVELOPER ? (
                          <>
                            <Link
                              to="/createFaq"
                              className="text-secondary dropdown-item"
                            >
                              <i class="fas fa-question-circle">
                                {" "}
                                <span className="text-secondary">
                                  FAQ Panel
                                </span>
                              </i>
                            </Link>
                          </>
                        ) : null
                      ) : null}
                      {/* Admin panel Only for admin */}
                      {getFromStorage("btt_local_storage") &&
                      getFromStorage("btt_local_storage").token !== "" ? (
                        getFromStorage("btt_current_user_role").userRole ===
                        Constants.ADMIN ? (
                          <>
                            <div class="dropdown-divider"></div>
                            <Link
                              to="/adminPanel"
                              className="text-secondary dropdown-item"
                            >
                              <i class="fas fa-user-cog text-danger">
                                {" "}
                                <span className="text-danger">Admin Panel</span>
                              </i>
                            </Link>
                          </>
                        ) : null
                      ) : null}
                      {/* ////////////////////// */}

                      <div class="dropdown-divider"></div>
                      <Link to="/registration" className="text-light">
                        <span className="badge badge-primary text-monospace p-2 m-2">
                          {" "}
                          <i className="fas fa-user-plus">
                            <span className="font-weight-bold pl-5 pr-5">
                              REGISTRATION
                            </span>
                          </i>
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </nav>
      </div>
    );
    // } else {
    //   return <Login />;
    // }
  }
}
// export default Header;
export default withRouter(Header);
