import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/SplitButton";
import brand_img from "../../assets/images/bug64.jpg";
import "../../assets/css/btt-style.css";
import SearchBug from "../bugs/SearchBug";

class Header extends Component {
  logoutHandler = (e) => {
    this.props.history.push("/login");
  };
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
                  <div>
                    <>
                      {
                        <SplitButton
                          key="Info"
                          id={`dropdown-split-variants-Info`}
                          title="Anonymous User"
                          variant="light"
                          size=""
                        >
                          <Dropdown.Item eventKey="1">
                            <Link to="/userProfile" className="text-info">
                              <i className="fas fa-user-circle text-info">
                                {" "}
                                User Profile
                              </i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="2">
                            <Link to="/login" className="text-secondary">
                              <i className="fas fa-sign-in-alt text-secondary">
                                {" "}
                                Login
                              </i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3">
                            <a
                              className="text-secondary"
                              href="#"
                              onClick={(e) => this.logoutHandler(e)}
                            >
                              <i className="fas fa-sign-out-alt text-secondary">
                                {" "}
                                Logout
                              </i>
                            </a>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="4">
                            <Link to="/adminPanel" className="text-secondary">
                              <i class="fas fa-user-cog"> Admin Panel</i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="5">
                            <Link
                              to="/userDashboard"
                              className="text-secondary"
                            >
                              <i className="fas fa-users"> User Dashboard</i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="6">
                            <Link to="/bugDashboard" className="text-secondary">
                              <i className="fas fa-bug"> Bug Dashboard</i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="7" className="">
                            <span className="badge badge-primary text-monospace p-2">
                              {" "}
                              <Link to="/registration" className="text-light">
                                <i className="fas fa-user-plus">
                                  <span className="font-weight-bold pl-5 pr-5">
                                    REGISTRATION
                                  </span>
                                </i>
                              </Link>
                            </span>
                          </Dropdown.Item>
                        </SplitButton>
                      }
                    </>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default withRouter(Header);
