import React from "react";
import welcome_img from "../../assets/images/btt-brand.jpg";
import SearchBug from "../bugs/SearchBug";

const Home = () => {
  return (
    <div class="container-fluid mt-5">
      <div className="row pb-4">
        {/* blank r1c1 */}
        <div className="col-xl-2"></div>
        {/* r1c2 - Home image box */}
        <div className="col-xl-8">
          <div className="row">
            <div className="col-xl-6 pl-0 pt-0">
              <div class="card border-0">
                <div class="card-body">
                  <img
                    className="img-thumbnail"
                    alt="btt-home-img"
                    src={welcome_img}
                  />
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              {/* Bug search box */}
              <div class="card border">
                <div class="card-header">
                  <h4 class="card-title">Bug Search</h4>
                </div>
                <div class="card-body">
                  {/* Search Bug Component */}
                  <SearchBug />
                </div>
              </div>
              {/* End of bug search box */}
            </div>
          </div>
        </div>
        {/* blank r1c3 */}
        <div className="col-xl-2"></div>
      </div>
      <div className="row mb-5">
        <div className="col-xl-2"></div>
        <div className="col-xl-8">
          {/* Issue type info */}
          <div class="card">
            <div class="card-header">
              <h4>We Offer</h4>
            </div>
            <div class="card-body">
              <h6 class="card-title">Report a Bug</h6>
              <p class="card-text">
                If you discover an issue with our Product, please start by
                searching the Bug Database to find out if that issue has been
                reported and fixed already. Once you confirm that the issue you
                discovered is new, please report it here. In your report, please
                include all relevant and detailed information necessary to
                reproduce the issue. As a simple example, a submission should
                include a test case demonstrating the issue to make it easier to
                reproduce. Please note that fixes for bug reports are not
                guaranteed through this channel. For bugs that require immediate
                and personal attention, We offer Premium Product Subscription.
              </p>
              <a href="#!" class="btn btn-sm btn-outline-primary">
                Report a Bug
              </a>
              <hr></hr>
              <h6 class="card-title">Suggest An Enhancement</h6>
              <p class="card-text">
                If you have a suggestion for a small change to an existing API
                or the way in which ou product behaves, please propose it here.
                Please note that the Bug Database is not the venue to propose
                large changes to our Product.
              </p>
              <a href="#!" class="btn btn-sm btn-outline-primary">
                Enhancement
              </a>
              <hr></hr>
              <h6 class="card-title">Request a new Feature</h6>
              <p class="card-text">
                If you have a suggestion for a new feature to an existing API or
                the way in which ou product behaves, please propose it here.
                Please note that the Bug Database is not the venue to propose
                large changes to our Product.
              </p>
              <a href="#!" class="btn btn-sm btn-outline-primary">
                New Feature
              </a>
              <hr></hr>
              <h6 class="card-title">Frequently asked Questions</h6>
              <p class="card-text">
                Refer to the Bug Submission FAQ's to answer questions you have
                related to the Bug Database and the Bug Submission Process.
              </p>
              <a href="#!" class="btn btn-sm p-0 pl-1 pr-1 btn-outline-primary">
                FAQ Page
              </a>
            </div>
          </div>
        </div>
        <div className="col-xl-2"></div>
      </div>
    </div>
  );
};

export default Home;
