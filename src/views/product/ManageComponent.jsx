import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
import UpdateComponent from "./UpdateComponent";
import CreateComponent from "./CreateComponent";
import ViewComponent from "./ViewComponents";
const ManageComponent = () => {
  return (
    <div className="mt-4">
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
                    View All Components
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
                  <ViewComponent />
                </div>
              </div>
            </div>
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
                    Create Component
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
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6 shadow pt-3 pb-3">
                      <CreateComponent />
                    </div>
                    <div className="col-xl-3"></div>
                  </div>
                </div>
              </div>
            </div>
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
                    Update Component
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
                  <div className="row ">
                    <div className="col-xl-3"></div>
                    <div className="col-xl-6 shadow pt-3 pb-3">
                      <UpdateComponent />
                    </div>
                    <div className="col-xl-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class="col-xl-5 border pt-4 pb-4 shadow">
          <h4 class="card-title lead text-danger font-weight-bold">
            UPDATE COMPONENT
          </h4>
          <hr></hr>
          <UpdateComponent />
        </div>
        <div class="col-xl-1"></div>
        <div class="col-xl-1"></div>
        <div class="col-xl-5 border pt-4 pb-4 shadow">
          <h4 class="card-title lead text-danger font-weight-bold">
            CREATE COMPONENT
          </h4>
          <hr></hr>
          <CreateComponent />
        </div> */}
      </div>
      {/* END */}
    </div>
  );
};
export default ManageComponent;
