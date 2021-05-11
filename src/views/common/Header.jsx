import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import brand_img from "../../assets/images/bug64.jpg";
import "../../assets/css/btt-style.css";
import SearchBug from "../bugs/SearchBug";
import { getFromStorage } from "../../utility/storage";
import HomeInternalDashboard from "./HomeInternalDashBoard";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { token: "", authStat: false };
    this.onClickLogin = this.onClickLogin.bind(this);
  }
  componentDidMount() {
    this.onClickLogin();
  }
  onClickFetchUser() {}
  onClickLogin() {
    const btt_local_storage_obj = getFromStorage("btt_local_storage");
    if (btt_local_storage_obj && btt_local_storage_obj.token) {
      const { token } = btt_local_storage_obj;
      // Verify token
      fetch("http://localhost:8765/btt/user/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            // alert(JSON.stringify(json.data));
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
      alert("outer else Token: ");
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
                    <Link className="nav-link text-danger" to="/faq">
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
                  {/* Dropdownlist */}
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-light"
                      onClick={this.onClickLogin}
                    >
                      {getFromStorage("btt_current_user").user !== ""
                        ? getFromStorage("btt_current_user").user
                        : "Anonymous User"}
                    </button>
                    <button
                      type="button"
                      class="btn btn-light dropdown-toggle dropdown-toggle-split"
                      onClick={this.onClickLogin}
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <Link
                        to="/userProfile"
                        className="text-info dropdown-item"
                      >
                        <i className="fas fa-user-circle text-info">
                          {" "}
                          User Profile
                        </i>
                      </Link>
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
                      <Link
                        to="/logout"
                        className="text-secondary dropdown-item"
                      >
                        <i className="fas fa-sign-out-alt text-secondary">
                          {" "}
                          Logout
                        </i>
                      </Link>
                      {this.state.authStat ? <HomeInternalDashboard /> : null}
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
