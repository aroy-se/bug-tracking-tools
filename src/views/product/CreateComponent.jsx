import React, { useState } from "react";
import * as Constants from "../../utility/Constants";
const CreateComponent = () => {
  const initialState = {
    productName: "",
    componentName: "",
  };
  const [input, setInput] = useState(initialState);
  const [id, setId] = useState("");
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

  var handlenSubmitNewComponent = (event) => {
    event.preventDefault();
    if (input.productName === "") {
      alert("Please choose a Product Name");
      return;
    }
    if (input.componentName === "") {
      alert("Please provide a valid component name");
      return;
    }
    const newComponentObject = {
      productName: input.productName,
      componentId: Math.floor(Math.random() * (999 - 100) + 100), // Just demo purpose
      componentName: input.componentName,
      createdTime: Date().toLocaleString(),
    };
    setId(newComponentObject.componentId);
    // save the data intodatabase
    saveNewComponent(newComponentObject);
    setInput((prevState) => {
      return {
        ...prevState,
        productName: "",
        componentName: "",
      };
    });
  };
  var saveNewComponent = (data) => {
    const parameters = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(Constants.COMPONENT_URL, parameters)
      .then((response) => response.json())
      .then((data) => {
        setSuccess(true);
      });
  };

  return (
    <div className="">
      <div>
        <h4 className="badge badge-primary text-light blockquote shadow">
          CREATE COMPONENT
        </h4>
      </div>
      <div class="form-group pt-3">
        <span className="badge badge-light text-dark">Product Name</span>
        <select
          className="custom-select shadow-sm form-control"
          name="productName"
          value={input.productName}
          onChange={handleChange}
          required
        >
          <option selected>Set Product</option>
          <option>BTT</option>
          <option>Others</option>
        </select>
      </div>
      <div class="form-group">
        <span className="badge badge-light text-dark">Component Name</span>
        <div class="input-group shadow-sm mb-4">
          <input
            type="text"
            placeholder="Provide a valid component name"
            required
            autoComplete="off"
            className="form-control fetch-n-update-by-id-text"
            name="componentName"
            value={input.componentName}
            onChange={handleChange}
          />
          <div class="input-group-append">
            <button
              type="button"
              name="fetch"
              className="btn btn-primary fetch-n-update-by-id-btn#"
              value="Fetch"
              onClick={handlenSubmitNewComponent}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <span onChange={handleChange} className="">
        {success && (
          <label
            className="alert alert-success p-0 d-flex justify-content-center"
            role="alert"
          >
            [ID-{id}] - "{input.componentName}" has been created as a component!
          </label>
        )}
      </span>
    </div>
  );
};
export default CreateComponent;
