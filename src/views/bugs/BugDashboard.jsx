import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CreateBugDetails from "./CreateBugDetails";
import BugList from "./BugList";
import FetchBugDetails from "./FetchBugDetails";
import FetchBugDetailsById from "./FetchBugDetailsById";
// import FetchBugDetailsByName from "./FetchBugDetailsByName";
import UpdateBugDetails from "./UpdateBugDetails";
import DeleteBugDetails from "./DeleteBugDetails";

const BugDashboard = () => {
  return (
    <BrowserRouter>
      <div className="user-dashboard">
        <ul>
          <li>
            <Link to="/createBugDetails">
              <label className="user-dashboard-label">Insert Details</label>
            </Link>
          </li>
          <li>
            <Link to="/bugList">
              <label className="user-dashboard-label">Bug List</label>
            </Link>
          </li>
          <li>
            <Link to="/fetchBugDetails">
              <label className="user-dashboard-label">Fetch Details</label>
            </Link>
          </li>
          {/* <li>
            <Link to="/fetchBugDetailsById">
              <label className="user-dashboard-label">
                Fetch Details by Bug Id
              </label>
            </Link>
          </li> */}
          {/* <li>
            <Link to="/fetchBugDetailsByName">
              <label className="user-dashboard-label">
                Fetch Details by Bug Title
              </label>
            </Link>
          </li> */}
          {/* <li>
            <Link to="/updateBugDetails">
              <label className="user-dashboard-label">Update Details</label>
            </Link>
          </li>
          <li>
            <Link to="/deleteBugDetails">
              <label className="user-dashboard-label">Delete Details</label>
            </Link>
          </li> */}
        </ul>
        <Switch>
          <Route path="/createBugDetails" component={CreateBugDetails}></Route>
          <Route path="/bugList" component={BugList}></Route>
          <Route path="/fetchBugDetails" component={FetchBugDetails}></Route>
          <Route
            path="/fetchBugDetailsById"
            component={FetchBugDetailsById}
          ></Route>
          {/* <Route
            path="/fetchBugDetailsByName"
            component={FetchBugDetailsByName}
          ></Route> */}
          {/* <Route path="/updateBugDetails" component={UpdateBugDetails}></Route>
          <Route path="/deleteBugDetails" component={DeleteBugDetails}></Route> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default BugDashboard;
