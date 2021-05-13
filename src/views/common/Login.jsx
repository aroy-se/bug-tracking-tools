import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { setInStorage, getFromStorage } from "../../utility/storage";
import Home from "./Home";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      loginError: "",
      loginSuccess: "",

      email: "",
      password: "",
    };
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onClickLogIn = this.onClickLogIn.bind(this);
  }
  onChangeEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }
  onChangePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }
  onClickLogIn() {
    // Grab state
    const { email, password } = this.state;
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch("http://localhost:8765/btt/user/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("btt_local_storage", { token: json.token });
          setInStorage("btt_current_user", { user: email });
          this.setState({
            loginError: "",
            loginSuccess: json.message,
            isLoading: false,
            password: "",
            email: "",
            token: json.token,
          });
          // store email to send the data to app.js parent
          // this.props.appData.getData(this.state.storeEmail);
        } else {
          this.setState({
            loginSuccess: "",
            loginError: json.message,
            isLoading: false,
          });
        }
      });
  }
  componentDidMount() {
    const obj = getFromStorage("btt_local_storage");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("http://localhost:8765/btt/user/verify?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  render() {
    const { isLoading, token, loginError, loginSuccess, email, password } =
      this.state;
    if (isLoading) {
      return (
        <div className="container mt-5">
          <p>Loading...</p>
        </div>
      );
    }
    console.log("Inside login render Token: " + token);
    if (!token) {
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-xl-3"></div>
            <div className="col-xl-5 mt-5">
              <div class="card shadow border-danger#">
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
                    placeholder="Provide registered Email-ID"
                    value={email}
                    onChange={this.onChangeEmail}
                    required
                    autoComplete="off"
                  />
                  <input
                    className={`login-password-input ${
                      loginError ? "error-password-input" : ""
                    }`}
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangePassword}
                    required
                    autoComplete="off"
                  />
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
                  {loginError ? (
                    <label
                      className="alert alert-danger p-0 d-flex justify-content-center"
                      role="alert"
                    >
                      {loginError}{" "}
                    </label>
                  ) : null}
                  {loginSuccess ? (
                    <label
                      className="alert alert-success p-0 d-flex justify-content-center"
                      role="alert"
                    >
                      {loginSuccess}{" "}
                    </label>
                  ) : null}
                  <button
                    className="login-btn mb-3"
                    onClick={this.onClickLogIn}
                  >
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
    return (
      // Redirectiong to home page after successful login
      <Home />
      // <div>
      //  <h1>{this.props.redirect}</h1>
      // </div>
      // <this.props.redirect />
    );
  }
}

export default withRouter(Login);
