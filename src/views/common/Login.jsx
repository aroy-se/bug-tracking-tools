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
      <div className="login-outer-box">
        <div className="login-box">
          <h3 className="login-label"> USER LOGIN</h3>
          <input
            className="login-username-input"
            id="userName"
            type="text"
            placeholder="Username"
            onChange={this.changeUsernameState}
            required={true}
            autoComplete="off"
          />
          <br />
          <input
            className={`login-password-input ${
              error ? "error-password-input" : ""
            }`}
            id="userName"
            type="password"
            placeholder="Password"
            onChange={this.changePasswordState}
            required={true}
            autoComplete="off"
          />
          {success && <p className="login-success">You are a valid user!</p>}
          {error && (
            <p className="login-error">Invalid Username and/or Password.</p>
          )}
          {/* <i class="fa fa-info-circle" aria-hidden="true">
            <span className="terms-info">
              By logging in, you agree to the <a href="">Terms of Service.</a>
            </span>
          </i> */}
          <div class="custom-control custom-checkbox mt-2">
            <input
              type="checkbox"
              class="custom-control-input"
              id="remember-me"
            />
            <label
              class="custom-control-label font-weight-lighter"
              for="remember-me"
            >
              Remember me
            </label>
          </div>
          <button className="login-btn" onClick={this.checkLogin}>
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
            <Link to="/registration">Create Account</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
