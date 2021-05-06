import React, { Component } from "react";
import * as Constants from "../../utility/Constants";
class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentName: "",
      componentDetails: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchComponent = this.handleFetchComponent.bind(this);
  }
  // Handle function
  handleChange(event) {
    this.setState({ componentName: event.target.value });
  }
  handleFetchComponent(event) {
    event.preventDefault();
    if (window.confirm("Do you want to fetch all the components?")) {
      // Fetch all!
    } else {
      // Do nothing!
      return;
    }
    let URL = Constants.COMPONENT_URL;
    if (this.state.componentName !== "") {
      URL = Constants.COMPONENT_BY_NAME_URL + this.state.componentName;
    }
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((componentData) => {
          this.setState({
            componentDetails: [...this.state.componentDetails, componentData],
          });
        });
      })
      .catch(() => {
        alert(
          `The Component: ${this.state.componentName} does not exist in our database`
        );
      });
    // finally reset the array
    this.setState({
      componentDetails: [],
    });
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-6 mb-3">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                aria-label=""
                aria-describedby="basic-addon1"
                placeholder="Provide component name"
                required={true}
                autoComplete="off"
                name="componentName"
                value={this.state.componentName}
                onChange={this.handleChange}
              />
              <div class="input-group-append">
                <button
                  type="button"
                  name="submit"
                  className="btn btn-success"
                  value="FETCH"
                  onClick={this.handleFetchComponent}
                >
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-3"></div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="table-wrapper-scroll-y component-table-responsive">
              <table className="table table-sm table-hover border">
                <thead class="thead-light">
                  <tr>
                    <th>Product Name</th>
                    <th>Component ID</th>
                    <th>Component Name</th>
                    <th>Created Time</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.componentDetails.map((component, index) => (
                    <tr key={index}>
                      <td>{component.productName}</td>
                      <td>{component.componentId}</td>
                      <td>{component.componentName}</td>
                      <td>{component.createdTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ViewComponent;
