import React from "react";
import $ from "jquery";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CreateBugDetails from "./CreateBugDetails";
import BugList from "./BugList";
import FetchBugDetails from "./FetchBugDetails";
import FetchBugDetailsById from "./FetchBugDetailsById";
// import FetchBugDetailsByName from "./FetchBugDetailsByName";
import UpdateBugDetails from "./UpdateBugDetails";
// import DeleteBugDetails from "./DeleteBugDetails";

class BugDashboard extends React.Component {
  componentDidMount() {
    // Jquery
    $("#bugTab a").on("click", function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  }
  render() {
    return (
      <BrowserRouter>
        {/* <div className="container-fluid mt-3 mb-5">
          <div className="row">
            <div className="col-xl-12"> */}
        <div className="card shadow mt-3 rounded-0">
          <div className="card-header lead font-weight-bold text-danger">
            BUG DASHBOARD
          </div>
          <div className="card-body ">
            {/* Start-Navigation page */}
            <ul class="nav nav-tabs" id="bugTab" role="tablist">
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
                  View Bugs
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-danger"
                  id="report-tab"
                  data-toggle="tab"
                  href="#report"
                  role="tab"
                  aria-controls="report"
                  aria-selected="true"
                >
                  Report A Bug
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link text-danger"
                  id="update-tab"
                  data-toggle="tab"
                  href="#update"
                  role="tab"
                  aria-controls="update"
                  aria-selected="true"
                >
                  Update A Bug
                </a>
              </li>
            </ul>
            <div class="tab-content" id="adminTabContent">
              <div
                class="tab-pane fade show active"
                id="view"
                role="tabpanel"
                aria-labelledby="view-tab"
              >
                <div class="card-body bg-white border border-top-0 shadow pl-0 pr-0">
                  <FetchBugDetails />
                </div>
              </div>
              <div
                class="tab-pane fade show"
                id="report"
                role="tabpanel"
                aria-labelledby="report-tab"
              >
                <div class="card-body bg-white  pl-0 pr-0 m-0">
                  <CreateBugDetails />
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="update"
                role="tabpanel"
                aria-labelledby="update-tab"
              >
                <div class="card-body bg-white pl-0 pr-0">
                  <UpdateBugDetails />
                </div>
              </div>
            </div>
            {/* End Navigation Page */}
            {/* </div>
              </div>
            </div> */}
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default BugDashboard;
