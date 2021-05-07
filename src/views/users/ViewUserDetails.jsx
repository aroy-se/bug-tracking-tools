import React from "react";
import * as Constants from "../../utility/Constants";

class ViewUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      userId: "",
      userName: "",
      searchInputText: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchUserSubmit = this.handleFetchUserSubmit.bind(this);
  }

  // Input handle function
  handleChange(event) {
    if (event.target.value === "") {
      this.setState({ userId: "" });
      this.setState({ userName: "" });
    } else {
      if (isNaN(event.target.value)) {
        this.setState({ userName: event.target.value });
      } else {
        this.setState({ userId: event.target.value });
      }
    }
  }

  handleFetchUserSubmit(event) {
    var target_url = Constants.URL;
    var inputText =
      this.state.userId !== ""
        ? this.state.userId
        : this.state.userName !== ""
        ? this.state.userName
        : "";
    var catch_err_msg = "";
    if (inputText === "") {
      if (window.confirm("Do you really want to fetch all the Users?")) {
        // Fetch All!
      } else {
        // Do nothing!
        return;
      }
      // Calling whole bug list
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else if (isNaN(inputText)) {
      // fetch data by username
      target_url = Constants.URL_USER_BY_NAME + inputText;
      catch_err_msg = inputText;
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else {
      // fetch data by user id
      target_url = Constants.URL + parseInt(inputText);
      catch_err_msg = inputText;
      this.fetchDatafromDatabase(target_url, true, catch_err_msg);
    }

    // reset data
    document.getElementById("userSearchInputText").value = "";
    this.setState({
      userDetails: [],
      userId: "",
      userName: "",
      searchInputText: "",
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
      })
      .catch(
        catch_err_msg === ""
          ? (error) => console.log(error)
          : () => {
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
                placeholder="Search user by userid/username"
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
        <div className="row">
          <div className="col-xl-12">
            <div className="table-wrapper-scroll-y component-table-responsive">
              <table className="table table-sm table-hover border">
                <thead class="thead-light">
                  <tr>
                    <th>User-ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Address-1</th>
                    <th>Address-2</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Photo</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.userDetails.map((user, index) => (
                    <tr key={index}>
                      <td>{user.userId}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.userName}</td>
                      <td>{user.password}</td>
                      <td>{user.role}</td>
                      <td>{user.address1}</td>
                      <td>{user.address2}</td>
                      <td>{user.city}</td>
                      <td>{user.state}</td>
                      <td>{user.zip}</td>
                      <td>{user.photo}</td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserDetails;
