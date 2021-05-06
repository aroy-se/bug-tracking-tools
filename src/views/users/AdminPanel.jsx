import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import UserRoleSettings from "./UserRoleSettings";
import ManageComponent from "../product/ManageComponent";
class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // Jquery
    $("#myTab a").on("click", function (e) {
      e.preventDefault();
      $(this).tab("show");
    });
  }
  render() {
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-xl-12">
            <div className="card shadow">
              <div className="card-body ">
                {/* Start-Navigation page */}
                <ul class="nav nav-tabs" id="myTab" role="tablist">
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
                  <li class="nav-item text-danger">
                    <a
                      class="nav-link text-danger"
                      id="component-tab"
                      data-toggle="tab"
                      href="#component"
                      role="tab"
                      aria-controls="component"
                      aria-selected="false"
                    >
                      Component
                    </a>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="user"
                    role="tabpanel"
                    aria-labelledby="user-tab"
                  >
                    <div class="card-body bg-white">
                      <UserRoleSettings />
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
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
