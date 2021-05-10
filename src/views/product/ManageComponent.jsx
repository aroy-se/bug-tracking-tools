import React from "react";
import UpdateComponent from "./UpdateComponent";
import CreateComponent from "./CreateComponent";
import ViewComponent from "./ViewComponents";
import DeleteComponent from "./DeleteComponent";
const ManageComponent = () => {
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
                    View Component
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
            {/* ///////////////////////////////////// */}
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
            {/* ///////////////////////////////////// */}
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
            {/* ///////////////////////////////////// */}
            <div class="card">
              <div class="card-header" id="headingFour">
                <h5 class="mb-0">
                  <button
                    class="btn btn-link collapsed text-danger p-0"
                    data-toggle="collapse"
                    data-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Delete Component
                  </button>
                </h5>
              </div>
              <div
                id="collapseFour"
                class="collapse"
                aria-labelledby="headingFour"
                data-parent="#accordion"
              >
                <div class="card-body">
                  <div className="row ">
                    {/* <div className="col-xl-3"></div> */}
                    <div className="col-xl-12 pt-3 pb-3">
                      <DeleteComponent />
                    </div>
                    {/* <div className="col-xl-3"></div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ManageComponent;
