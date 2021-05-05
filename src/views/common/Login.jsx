import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as Constants from "../../utility/Constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      pwd: "",
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
  checkLogin = () => {
    const data = this.state.userDetails;
    for (let i = 0; i < data.length; i++) {
      if (
        this.state.userName === data[i].userName &&
        this.state.pwd === data[i].password
      ) {
        this.setState({ error: false, success: true });
        break;
      } else {
        this.setState({ error: true });
      }
    }
  };

  changeUsernameState = (event) => {
    this.setState({ error: false, success: false });
    this.setState({ userName: event.target.value });
  };

  changePasswordState = (event) => {
    this.setState({ error: false, success: false });
    this.setState({ pwd: event.target.value });
  };

  render() {
    const { error, success } = this.state;
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-5">
            <div class="card shadow border-danger">
              <span class="card-header shadow-sm mb-2">
                <i class="fas fa-sign-in-alt text-danger">
                  {" "}
                  <span className="lead text-danger">USER LOGIN</span>
                </i>
              </span>
              <div class="card-body">
                <input
                  className="login-username-input mb-3 mt-3"
                  id="userName"
                  type="text"
                  placeholder="Username"
                  onChange={this.changeUsernameState}
                  required
                  autoComplete="off"
                />
                <input
                  className={`login-password-input ${
                    error ? "error-password-input" : ""
                  }`}
                  id="userName"
                  type="password"
                  placeholder="Password"
                  onChange={this.changePasswordState}
                  required
                  autoComplete="off"
                />
                {success && (
                  <p className="login-success">You are a valid user!</p>
                )}
                {error && (
                  <p className="login-error">
                    Invalid Username and/or Password.
                  </p>
                )}
                <div class="custom-control custom-checkbox mt-3">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="remember-me"
                  />
                  <label
                    class="custom-control-label font-weight-lighter mb-2"
                    for="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <button className="login-btn mb-3" onClick={this.checkLogin}>
                  LOGIN
                </button>
                <div className="or-label">
                  <label>
                    <big>
                      <b>OR</b>
                    </big>
                  </label>
                </div>
                <div className="create-account">
                  <Link to="/registration">
                    <span className="text-primary badge badge-light">
                      <u>Create Account</u>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3"></div>
        </div>
      </div>
    );
  }
}

export default Login;
