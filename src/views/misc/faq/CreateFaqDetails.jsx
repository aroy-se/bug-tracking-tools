import React from "react";
import * as Constants from "../../../utility/Constants";
import { getFromStorage } from "../../../utility/storage";
import Login from "../../common/Login";

class CreateFaq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faqError: "",
      faqSuccess: "",

      faqTitle: "",
      faqDesc: "",
    };

    this.onChangeFaqTitle = this.onChangeFaqTitle.bind(this);
    this.onChangeFaqDesc = this.onChangeFaqDesc.bind(this);

    this.onClickCreateFaq = this.onClickCreateFaq.bind(this);
  }
  onChangeFaqTitle(event) {
    this.setState({
      faqTitle: event.target.value,
    });
  }
  onChangeFaqDesc(event) {
    this.setState({
      faqDesc: event.target.value,
    });
  }

  onClickCreateFaq(event) {
    event.preventDefault();
    // Grab state
    const { faqTitle, faqDesc } = this.state;
    console.log("faq url... " + Constants.FAQ_URL);
    // Post request to backend
    fetch(Constants.FAQ_URL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        faqTitle: faqTitle,
        faqDesc: faqDesc,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            faqError: "",
            faqSuccess: json.message,

            faqTitle: "",
            faqDesc: "",
          });
        } else {
          this.setState({
            faqSuccess: "",
            faqError: json.message,
          });
        }
      });
  }

  render() {
    const btt_local_storage_token = getFromStorage("btt_local_storage");
    if (btt_local_storage_token && btt_local_storage_token.token) {
      const { faqError, faqSuccess, faqTitle, faqDesc } = this.state;
      return (
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-xl-2"></div>
            <div className="col-xl-8">
              <div class="card shadow">
                <div class="card-header shadow-sm">
                  <span className="lead text-danger">CREATE FAQ</span>
                </div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label
                        for="formGroupExampleInput"
                        className="badge badge-light text-danger"
                      >
                        FAQ Title
                      </label>
                      <input
                        type="text"
                        class="form-control shadow-sm"
                        id="formGroupExampleInput"
                        placeholder="FAQ Title"
                        name="faqTitle"
                        value={faqTitle}
                        onChange={this.onChangeFaqTitle}
                      />
                    </div>
                    <div class="form-group">
                      <label
                        for="formGroupExampleInput2"
                        className="badge badge-light text-danger"
                      >
                        FAQ Description
                      </label>
                      <textarea
                        type="textarea"
                        class="form-control shadow-sm"
                        name="faqDesc"
                        value={faqDesc}
                        onChange={this.onChangeFaqDesc}
                        placeholder="Provide detailed description"
                      />
                    </div>
                  </form>

                  <div class="row mt-4">
                    <div class="col-xl-3"></div>
                    <div class="col-xl-6">
                      {/* <span onChange={this.onChange}>
                      {success && (
                        <label
                          className="alert alert-success p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          Your new faq request(ID={id}) has been sent
                          successfully!
                        </label>
                      )}
                    </span> */}
                      {faqError ? (
                        <label
                          className="alert alert-danger p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          {faqError}{" "}
                        </label>
                      ) : null}
                      {faqSuccess ? (
                        <label
                          className="alert alert-success p-0 d-flex justify-content-center"
                          role="alert"
                        >
                          {faqSuccess}
                        </label>
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-danger btn-lg btn-block shadow mb-2"
                        name="submit"
                        onClick={this.onClickCreateFaq}
                      >
                        CREATE FAQ
                      </button>
                    </div>
                    <div class="col-xl-3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-2"></div>
          </div>
        </div>
      );
    } else {
      return <Login />;
    }
  }
}

export default CreateFaq;
