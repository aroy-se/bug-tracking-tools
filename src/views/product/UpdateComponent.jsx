import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
const UpdateComponent = () => {
  const initialState = {
    componentId: "",
    componentName: "",
  };
  const [input, setInput] = useState(initialState);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
    // reset the status label
    setSuccess(false);
  }

  function handleUpdateComponentSubmit(event) {
    event.preventDefault();
    if (input.componentName === "") {
      alert("Component-Name field should not be empty!");
      return;
    } else if (isNaN(input.componentId)) {
      alert("Only Digits are accepted");
      return;
    }
    const updateComponentObject = {
      componentName: input.componentName,
    };
    saveUpdatedComponent(updateComponentObject);
    setInput((prevState) => {
      return {
        ...prevState,
        componentId: "",
        componentName: "",
      };
    });
  }
  var saveUpdatedComponent = (componentData) => {
    const parameters = {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(componentData),
    };

    fetch(Constants.COMPONENT_URL + parseInt(input.componentId), parameters)
      .then((response) => response.json())
      .then(() => {
        setSuccess(true);
      });
    setName(input.componentName);
  };
  function handleFetchById(event) {
    event.preventDefault();
    if (input.componentId === "") {
      alert("Component-Id field should not be empty!");
      return;
    }
    fetch(Constants.COMPONENT_URL + parseInt(input.componentId))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        var component = data;
        var componentId = JSON.stringify(component.componentId);
        var componentName = JSON.stringify(component.componentName);

        setInput((component) => {
          return {
            ...component,
            componentId: JSON.parse(componentId),
            componentName: JSON.parse(componentName),
          };
        });
      })
      .catch(() => {
        alert(
          `The component, ${input.componentId} does not exist in our database!`
        );
      });
  }

  return (
    <div className="">
      <div>
        <h4 className="badge badge-danger text-light blockquote shadow">
          UPDATE COMPONENT
        </h4>
      </div>
      <div class="form-group pt-3">
        <span className="badge badge-light text-dark">Component ID</span>
        <div class="input-group shadow-sm mb-4">
          <input
            type="text"
            placeholder="Update a component by ID"
            required
            autoComplete="off"
            className="form-control fetch-n-update-by-id-text"
            name="componentId"
            value={input.componentId}
            onChange={handleChange}
          />
          <div class="input-group-append">
            <button
              type="button"
              name="fetch"
              className="btn btn-danger"
              value="Fetch"
              onClick={handleFetchById}
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="form-group pb-4">
        <span className="badge badge-light text-dark">Component Name</span>
        <input
          type="text"
          className="shadow-sm form-control"
          autoComplete="off"
          name="componentName"
          value={input.componentName}
          onChange={handleChange}
        />
      </div>
      <span onChange={handleChange} className="">
        {success && (
          <label
            className="alert alert-success p-0 d-flex justify-content-center"
            role="alert"
          >
            The component, "{name}" has been updated successfully!
          </label>
        )}
      </span>
      <button
        type="button"
        className="btn btn-danger btn-lg btn-block shadow"
        name="submit"
        value="UPDATE COMPONENT"
        onClick={handleUpdateComponentSubmit}
      >
        UPDATE COMPONENT
      </button>
    </div>
  );
};
export default UpdateComponent;
