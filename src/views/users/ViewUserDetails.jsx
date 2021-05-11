import React from "react";
import * as Constants from "../../utility/Constants";

class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      userId: "",
      email: "",
      searchInputText: "",
      successFetch: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchUserSubmit = this.handleFetchUserSubmit.bind(this);
  }

  // Input handle function
  handleChange(event) {
    if (event.target.value === "") {
      this.setState({ userId: "" });
      this.setState({ email: "" });
    } else {
      if (isNaN(event.target.value)) {
        this.setState({ email: event.target.value });
      } else {
        this.setState({ userId: event.target.value });
      }
    }
  }

  handleFetchUserSubmit(event) {
    var target_url = Constants.USER_URL;
    var inputText =
      this.state.userId !== ""
        ? this.state.userId
        : this.state.email !== ""
        ? this.state.email
        : "";
    var catch_err_msg = "";
    if (inputText === "") {
      if (window.confirm("Do you really want to fetch all the Users?")) {
        // Fetch All!
      } else {
        // Do nothing!
        return;
      }
      // console.log("empty target_url:   " + target_url);
      // Calling whole bug list
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else if (isNaN(inputText)) {
      // fetch data by email id
      target_url = Constants.URL_USER_BY_EMAIL + inputText;
      catch_err_msg = inputText;
      // console.log("name target_url: " + target_url);
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else {
      // fetch data by user id
      target_url = Constants.USER_URL + parseInt(inputText);
      // console.log("id target_url:  " + target_url);
      catch_err_msg = inputText;
      this.fetchDatafromDatabase(target_url, true, catch_err_msg);
    }

    // reset data
    document.getElementById("userSearchInputText").value = "";
    this.setState({
      userDetails: [],
      userId: "",
      email: "",
      searchInputText: "",
      successFetch: false,
    });
  }

  /**
   * To fetch data
   * arg1- var(string):: db url
   * arg2- boolean:: wrap the data inside an array
   * arg3- var(string):: error-catch message
   */
  fetchDatafromDatabase(url, wrapArray, catch_err_msg) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (wrapArray === true) {
          this.setState({ userDetails: new Array(data) });
        } else {
          this.setState({ userDetails: data });
        }
        this.setState({ successFetch: true });
      })
      .catch(
        catch_err_msg === ""
          ? (error) => console.log(error)
          : () => {
              this.setState({ successFetch: false });
              alert(
                `The search input, ${catch_err_msg} does not exist in our database`
              );
            }
      );
    document.getElementById("userSearchInputText").value = "";
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-xl-4"></div>
          <div className="col-xl-4 mb-3">
            {/* Search engine for user */}
            <div class="input-group">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search user by userid/email-id"
                required
                autoComplete="off"
                name="userSearchInputText"
                id="userSearchInputText"
                onChange={this.handleChange}
              />
              <div class="input-group-append">
                <button
                  type="button"
                  name="submit"
                  className="btn btn-primary"
                  value="FETCH"
                  onClick={this.handleFetchUserSubmit}
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
            {/* ////////END of Search user//////////// */}
          </div>
          <div className="col-xl-4"></div>
        </div>
        {this.state.successFetch ? (
          <div className="row">
            <div className="col-xl-12">
              <div className="table-wrapper-scroll-y component-table-responsive">
                <table className="table table-sm table-hover border">
                  <thead class="thead-light">
                    <tr>
                      <th>User-ID</th>
                      {/* <th>Username</th> */}
                      <th>Name</th>
                      {/* <th>Password</th> */}
                      <th>Role</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address-1</th>
                      <th>Address-2</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Zip</th>
                      {/* <th>Photo</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.userDetails.map((user, index) => (
                      <tr key={index}>
                        <td>{user.userId}</td>
                        {/* <td>{user.email}</td> */}
                        <td>{user.firstName + " " + user.lastName}</td>
                        {/* <td>{user.password}</td> */}
                        <td>{user.userRole}</td>
                        <td>{user.email}</td>
                        <td>{user.mobile}</td>
                        <td>{user.address1}</td>
                        <td>{user.address2}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                        <td>{user.zip}</td>
                        {/* <td>{user.photo}</td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-xl-3"></div>
            <div className="col-xl-6">
              <div className="alert alert-danger text-center">
                Empty Result! Click on search to fetch the user details...
              </div>
            </div>
            <div className="col-xl-3"></div>
          </div>
        )}
      </div>
    );
  }
}

export default ViewUserDetails;
