import React, { Component } from "react";
import * as Constants from "../../utility/Constants";
class ViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentId: "",
      componentName: "",
      componentDetails: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFetchComponent = this.handleFetchComponent.bind(this);
  }
  // Handle function
  handleChange(event) {
    if (event.target.value === "") {
      this.setState({ componentId: "" });
      this.setState({ componentName: "" });
    } else {
      if (isNaN(event.target.value)) {
        this.setState({ componentName: event.target.value });
      } else {
        this.setState({ componentId: event.target.value });
      }
    }
  }
  handleFetchComponent(event) {
    // event.preventDefault();
    var searchInputText =
      this.state.componentId !== ""
        ? this.state.componentId
        : this.state.componentName !== ""
        ? this.state.componentName
        : "";
    var target_url = Constants.COMPONENT_URL;
    var catch_err_msg = "";
    if (searchInputText === "") {
      if (window.confirm("Do you really want to fetch all the Components?")) {
        // Fetch All!
      } else {
        // Do nothing!
        return;
      }
      // Calling whole bug list
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else if (isNaN(searchInputText)) {
      // fetch data by bug title
      target_url = Constants.COMPONENT_BY_NAME_URL + searchInputText;
      catch_err_msg = searchInputText;
      this.fetchDatafromDatabase(target_url, false, catch_err_msg);
    } else {
      // fetch data by bug id
      target_url = Constants.COMPONENT_URL + parseInt(searchInputText);
      catch_err_msg = searchInputText;
      this.fetchDatafromDatabase(target_url, true, catch_err_msg);
    }
    // finally reset the array
    this.setState({
      componentId: "",
      componentName: "",
      componentDetails: [],
    });
  }
  /**
   * To fetch data
   * arg1- var(string):: db url
   * arg2- boolean:: wrap the data inside an array
   * arg3- var(string):: error-catch message
   */
  fetchDatafromDatabase(url, wrapArray, catch_err_msg) {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (wrapArray === true) {
          this.setState({ componentDetails: new Array(data) });
        } else {
          this.setState({ componentDetails: data });
        }
      })
      .catch(
        catch_err_msg === ""
          ? (error) => console.log("Error: " + error)
          : () => {
              alert(
                `The component, ${catch_err_msg} does not exist in our database`
              );
            }
      );
    return;
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
                className="form-control shadow-sm"
                placeholder="Search component/s by Id/Name"
                required
                autoComplete="off"
                name="componentName"
                id="componentName"
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
