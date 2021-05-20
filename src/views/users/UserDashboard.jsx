import React from "react";
import $ from "jquery";
// import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
// import CreateUserDetails from "./CreateUserDetails";
// import ReadUserDetails from "./ReadUserDetails";
// import ReadUserDetailsById from "./ReadUserDetailsById";
// import ReadUserDetailsByName from "./ReadUserDetailsByName";
// import UpdateUserDetails from "./UpdateUserDetails";
// import DeleteUserDetails from "./DeleteUserDetails";
import ViewUserDetails from "./ViewUserDetails";

class UserDashboard extends React.Component {
  componentDidMount() {
    // Jquery
    $("#userTab a").on("click", function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  }
  render() {
    return (
      // <BrowserRouter>
      <div className="card shadow mt-3 rounded-0">
        <div className="card-header shadow-sm lead font-weight-bold text-danger">
          USER DASHBOARD
        </div>
        <div className="card-body ">
          {/* Start-Navigation page */}
          <ul class="nav nav-tabs" id="userTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active text-danger"
                id="view-tab"
                data-toggle="tab"
                href="#view"
                role="tab"
                aria-controls="view"
                aria-selected="true"
              >
                View Users
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link disabled"
                id="stat-tab"
                data-toggle="tab"
                href="#stat"
                role="tab"
                aria-controls="stat"
                aria-selected="true"
                disabled
              >
                User Stat
              </a>
            </li>
          </ul>
          <div
            class="tab-content border border-top-0 shadow"
            id="userTabContent"
          >
            <div
              class="tab-pane fade show active"
              id="view"
              role="tabpanel"
              aria-labelledby="view-tab"
            >
              <div class="card-body bg-white  pl-2 pr-2">
                <ViewUserDetails />
              </div>
            </div>
            <div
              class="tab-pane fade show"
              id="stat"
              role="tabpanel"
              aria-labelledby="stat-tab"
            >
              <div class="card-body bg-white pl-0 pr-0 m-0">
                {/* <UserStat /> */}
              </div>
            </div>
          </div>
          {/* End Navigation Page */}
          {/* </div>
              </div>
            </div> */}
        </div>
      </div>
      // </BrowserRouter>
    );
  }
}
export default UserDashboard;
