import React, { Component } from "react";
import * as Constants from "../../../utility/Constants";

class ViewFaqDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faqDetails: [],
      faqId: "",
      faqTitle: "",
    };
    this.fetchDataFromDatabase = this.fetchDataFromDatabase.bind(this);
  }
  //  React Life cycle method
  componentDidMount() {
    this.fetchDataFromDatabase(Constants.FAQ_URL);
  }
  /**
   * To fetch data
   * arg1- var(string):: db url
   */
  fetchDataFromDatabase(url) {
    console.log("faq url : " + url);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("faq data : " + JSON.stringify(data));
        this.setState({ faqDetails: data });
      })
      .catch((error) => console.log(error));
    return;
  }

  render() {
    const { faqDetails } = this.state;
    return (
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-xl-12 mb-3">
            <div class="card shadow-lg rounded-0">
              <div class="card-header shadow-sm">
                <span className="lead text-danger">
                  Frequently Asked Questions
                </span>
              </div>
              <div class="card-body ">
                {faqDetails.map((faq, index) => (
                  <div className="list-group p-1 rounded-0" key={index}>
                    <div class="list-group-item list-group-item-action flex-column align-items-start shadow-sm">
                      <h6 class="card-title text-danger font-weight-normal">
                        # <u>{faq.faqTitle}</u>
                      </h6>
                      <p class="card-text">
                        <small>
                          <span className="font-weight-lighter text-secondary">
                            {faq.faqDesc}
                          </span>
                        </small>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewFaqDetails;
