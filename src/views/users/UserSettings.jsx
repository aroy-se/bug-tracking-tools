import React from "react";
import UserRoleSettings from "../users/UserRoleSettings";
import UpdateUserDetails from "./UpdateUserDetails";
import DeleteUserDetails from "./DeleteUserDetails";
import ViewUserDetails from "./ViewUserDetails";

const UserSettings = () => {
  return (
    <div className="mt-0">
      <div className="row">
        <div className="col-xl-12">
          <div id="accordion">
            <div class="card">
              <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link text-danger p-0"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    User Role Settings
                  </button>
                </h5>
              </div>

              <div
                id="collapseOne"
                class="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <UserRoleSettings />
                </div>
              </div>
            </div>
            {/* ///////////View USER//////////// */}
            <div class="card">
              <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link collapsed text-danger p-0"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    View User
                  </button>
                </h5>
              </div>
              <div
                id="collapseTwo"
                class="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordion"
              >
                <div class="card-body ">
                  <div className="row ">
                    {/* <div className="col-xl-3"></div> */}
                    <div className="col-xl-12">
                      <ViewUserDetails />
                    </div>
                    {/* <div className="col-xl-3"></div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* ////////////UPDATE USER///////////// */}
            <div class="card">
              <div class="card-header" id="headingThree">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link collapsed text-danger p-0"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Update User
                  </button>
                </h5>
              </div>
              <div
                id="collapseThree"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                <div class="card-body">
                  {/* <div className="row "> */}
                  {/* <div className="col-xl-3"></div> */}
                  {/* <div className="col-xl-12"> */}
                  <UpdateUserDetails />
                  {/* </div> */}
                  {/* <div className="col-xl-3"></div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            {/* /////////DELETE USER//////////// */}

            <div class="card">
              <div class="card-header" id="headingThree">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link collapsed text-danger p-0"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Delete User
                  </button>
                </h5>
              </div>
              <div
                id="collapseFour"
                class="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordion"
              >
                <div class="card-body">
                  {/* <div className="row ">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6 shadow pt-3 pb-3"> */}
                  <DeleteUserDetails />
                  {/* </div> */}
                  {/* <div className="col-xl-3"></div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSettings;
