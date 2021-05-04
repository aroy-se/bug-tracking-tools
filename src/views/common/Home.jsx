import React from "react";
import { Link } from "react-router-dom";
import home_bg_img from "../../assets/images/home_bg_img.jpg";
import bug_img from "../../assets/images/bug_home_img.jpg";
import enhancement_img from "../../assets/images/enhancement_home_img.jpg";
import new_feature_img from "../../assets/images/new_feature_home_img.jpg";
import faq_img from "../../assets/images/faq_home_img.jpg";

const Home = () => {
  return (
    <div class="container-fluid mt-5">
      <div className="row pb-4">
        {/* blank r1c1 */}
        <div className="col-xl-2"></div>
        {/* r1c2 - Home image box */}
        <div className="col-xl-8">
          <div class="card mb-0 shadow border-0">
            <img class="card-img-top" src={home_bg_img} alt="Card image cap" />
            {/* <div class="card-img-overlay">
              <div class="card-body">
                <SearchBug />
              </div>
            </div> */}
            <div class="card-body">
              <h5 class="card-title Blockquote">BTT - Bug Tracking Tools</h5>
              <p class="card-text font-weight-lighter">
                It is a brand new bug tracking product, developed by APC-Web
                Development POC-G1 team, used for bug tracking and project
                management.
              </p>
              <footer class="blockquote-footer float-right">
                <small class="text-muted">
                  Upcoming release BTT-v2021.06 will be released on 13-May-2021
                </small>
              </footer>
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
          <div class="card shadow">
            <div class="card-header">
              <h5>We Offer</h5>
            </div>
            <div class="card-group ">
              <div class="card border-top-0 border-left-0 border-bottom-0">
                <img class="card-img-top" src={bug_img} alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title">Report a Bug</h5>
                  <p class="card-text text-justify font-weight-lighter">
                    If you discover an issue with our Product, please start by
                    searching the Bug Database to find out if that issue has
                    been reported and fixed already. Once you confirm that the
                    issue you discovered is new, please report it here. In your
                    report, please include all relevant and detailed information
                    necessary to reproduce the issue.
                  </p>
                  <Link
                    to="/createBugDetails"
                    class="btn btn-sm btn-outline-danger"
                  >
                    Report a Bug
                  </Link>
                </div>
              </div>
              <div class="card border-top-0 border-left-0 border-bottom-0">
                <img
                  class="card-img-top"
                  src={enhancement_img}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">Enhancement</h5>
                  <p class="card-text text-justify font-weight-lighter">
                    If you have a suggestion for a small change to an existing
                    API or the way in which ou product behaves, please propose
                    it here. Please note that the Bug Database is not the venue
                    to propose large changes to our Product.
                  </p>
                  <Link
                    to="/createBugDetails"
                    class="btn btn-sm btn-outline-primary"
                  >
                    Enhancement
                  </Link>
                </div>
              </div>
              <div class="card  border-top-0 border-left-0 border-bottom-0">
                <img
                  class="card-img-top"
                  src={new_feature_img}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h5 class="card-title">New Feature</h5>
                  <p class="card-text text-justify font-weight-lighter">
                    If you have a suggestion for a new feature to an existing
                    API or the way in which ou product behaves, please propose
                    it here. Please note that the Bug Database is not the venue
                    to propose large changes to our Product.
                  </p>
                  {/* @TODO - ToBeImplemented */}
                  <Link to="/newFeature" class="btn btn-sm btn-outline-info">
                    New Feature
                  </Link>
                  {/* <a href="#!" class="btn btn-sm btn-outline-info">
                    New Feature
                  </a> */}
                </div>
              </div>
              <div class="card pt-3 border-top-0 border-right-0 border-bottom-0">
                <img class="card-img-top" src={faq_img} alt="Card image cap" />
                <div class="card-body">
                  <h5 class="card-title">FAQ</h5>
                  <p class="card-text font-weight-lighter">
                    Refer to the Bug Submission FAQ's to answer questions you
                    have related to the Bug Database and the Bug Submission
                    Process.
                  </p>
                  <Link
                    to="/faq"
                    class="btn btn-sm p-0 pl-1 pr-1 btn-outline-secondary"
                  >
                    FAQ Page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2"></div>
      </div>
    </div>
  );
};

export default Home;
