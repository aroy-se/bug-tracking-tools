import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CreateUserDetails from "./CreateUserDetails";
import ReadUserDetails from "./ReadUserDetails";
import ReadUserDetailsById from "./ReadUserDetailsById";
import ReadUserDetailsByName from "./ReadUserDetailsByName";
import UpdateUserDetails from "./UpdateUserDetails";
import DeleteUserDetails from "./DeleteUserDetails";

const UserDashboard = () => {
  return (
    <BrowserRouter>
      <div className="user-dashboard">
        <ul>
          <li>
            <Link to="/createUserDetails">
              <label className="user-dashboard-label">Insert Details</label>
            </Link>
          </li>
          <li>
            <Link to="/readUserDetails">
              <label className="user-dashboard-label">Fetch Details</label>
            </Link>
          </li>
          <li>
            <Link to="/readUserDetailsById">
              <label className="user-dashboard-label">
                Fetch Details by User Id
              </label>
            </Link>
          </li>
          <li>
            <Link to="/readUserDetailsByName">
              <label className="user-dashboard-label">
                Fetch Details by User Name
              </label>
            </Link>
          </li>
          <li>
            <Link to="/updateUserDetails">
              <label className="user-dashboard-label">Update Details</label>
            </Link>
          </li>
          <li>
            <Link to="/deleteUserDetails">
              <label className="user-dashboard-label">Delete Details</label>
            </Link>
          </li>
        </ul>
        <Switch>
          <Route
            path="/createUserDetails"
            component={CreateUserDetails}
          ></Route>
          <Route path="/readUserDetails" component={ReadUserDetails}></Route>
          <Route
            path="/readUserDetailsById"
            component={ReadUserDetailsById}
          ></Route>
          <Route
            path="/readUserDetailsByName"
            component={ReadUserDetailsByName}
          ></Route>
          <Route
            path="/updateUserDetails"
            component={UpdateUserDetails}
          ></Route>
          <Route
            path="/deleteUserDetails"
            component={DeleteUserDetails}
          ></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default UserDashboard;
