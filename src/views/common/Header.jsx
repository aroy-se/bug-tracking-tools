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
        <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-lg">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline d-flex justify-content-between w-100">
              <ul class="navbar-nav ">
                <li>
                  <Link
                    to="/"
                    className="navbar-brand font-weight-bold text-danger"
                  >
                    <img
                      src={brand_img}
                      width="30"
                      height="30"
                      class="d-inline-block align-top"
                      alt="btt-brand"
                    />{" "}
                    Bug Tracking Tools
                  </Link>
                </li>
              </ul>
              <ul class="navbar-nav ">
                {/* Bug SEARCH ENGINE */}
                <li class="nav-item border-1">
                  <div class="form-group mr-2">
                    <div class="input-group">
                      <SearchBug />
                      {/* <input
                        type="text"
                        placeholder="Bug search engine"
                        required
                        autoComplete="off"
                        className="form-control shadow-sm"
                        name="bugSearchInputText"
                        id="bugSearchInputText"
                        // onChange={this.handleChange}
                      />
                      <div class="input-group-append">
                        <button
                          type="button"
                          name="fetch"
                          className="btn btn-danger"
                          value="Search"
                          // onClick={this.controllerHandleSearch}
                        >
                          Search
                        </button>
                      </div> */}
                    </div>
                  </div>
                </li>
              </ul>
              {/* <form class="form-inline my-lg-0 ml-auto"> */}
              <ul class="navbar-nav ">
                <li class="nav-item">
                  <div class="nav-item">
                    {/* <a class="nav-link text-secondary" href="#"> */}
                    <Link class="nav-link text-danger" to="/faq">
                      FAQ
                    </Link>
                    {/* </a> */}
                  </div>
                </li>
                <li class="nav-item">
                  <div class="nav-item">
                    {/* <a class="nav-link text-secondary" href="#"> */}
                    <Link to="/about" class="nav-link text-danger">
                      About
                    </Link>
                    {/* </a> */}
                  </div>
                </li>
                <li class="nav-item">
                  <div>
                    <>
                      {
                        <SplitButton
                          key="Info"
                          id={`dropdown-split-variants-Info`}
                          title="UserName"
                          variant="light"
                          size=""
                        >
                          <Dropdown.Item eventKey="1">
                            <i class="fas fa-user-circle text-info">
                              {" "}
                              User Profile
                            </i>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="2">
                            <i class="fas fa-sign-in-alt text-secondary">
                              <Link to="/login" class="text-secondary">
                                {" "}
                                Login
                              </Link>
                            </i>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3">
                            <i class="fas fa-sign-out-alt text-secondary">
                              <a
                                class="text-secondary"
                                href="#"
                                onClick={(e) => this.logoutHandler(e)}
                              >
                                {" "}
                                Logout
                              </a>
                            </i>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="3">
                            <Link to="/userDashboard" class="text-secondary">
                              <i class="fas fa-users"> User Dashboard</i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3">
                            <Link to="/bugDashboard" class="text-secondary">
                              <i class="fas fa-bug"> Bug Dashboard</i>
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="4" className="">
                            <span className="badge badge-primary text-monospace p-2">
                              <i class="fas fa-user-plus">
                                {" "}
                                <Link to="/registration" class="text-light">
                                  Registration
                                </Link>
                              </i>
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
