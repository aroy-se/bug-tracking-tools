import React from "react";
import $ from "jquery";
import UserSettings from "./UserSettings";
import ManageComponent from "../product/ManageComponent";
class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Jquery
    $("#adminTab a").on("click", function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  }
  render() {
    return (
      // <div className="container-fluid mt-5 mb-5">
      //   <div className="row">
      //     <div className="col-xl-12">
      <div className="card shadow mt-3 rounded-0">
        <div className="card-header lead font-weight-bold text-danger">
          <i class="fas fa-user-cog"> ADMIN PANEL</i>
        </div>
        <div className="card-body">
          {/* Start-Navigation page */}
          <ul class="nav nav-tabs" id="adminTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active text-danger"
                id="user-tab"
                data-toggle="tab"
                href="#user"
                role="tab"
                aria-controls="user"
                aria-selected="true"
              >
                User
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-danger"
                id="component-tab"
                data-toggle="tab"
                href="#component"
                role="tab"
                aria-controls="component"
                aria-selected="true"
              >
                Component
              </a>
            </li>
          </ul>
          <div class="tab-content" id="adminTabContent">
            <div
              class="tab-pane fade show active"
              id="user"
              role="tabpanel"
              aria-labelledby="user-tab"
            >
              <div class="card-body bg-white">
                <UserSettings />
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="component"
              role="tabpanel"
              aria-labelledby="component-tab"
            >
              <div class="card-body bg-white">
                <ManageComponent />
              </div>
            </div>
          </div>
          {/* End Navigation Page */}
        </div>
      </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default AdminPanel;
