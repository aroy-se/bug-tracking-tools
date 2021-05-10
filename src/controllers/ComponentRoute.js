const express = require("express");
const ComponentModel = require("../models/ComponentModel");
const componentRouter = express.Router();

/**
 * Create a COMPONENT
 * [C]RUD := [C]REATE => POST(ONE)
 */
// ---------------------------------------------------------
componentRouter.post("/component", (request, response) => {
  console.log(request);
  const { body } = request;
  const { productName, componentName } = body;
  if (!productName) {
    return response.send({
      success: false,
      message: "Error: Select a Product Name",
    });
  }
  if (!componentName) {
    return response.send({
      success: false,
      message: "Error: Component Name cannot be blank",
    });
  }
  // save the new component
  let newComponent = new ComponentModel();
  newComponent.productName = productName;
  newComponent.componentName = componentName;

  newComponent.save((err, component) => {
    if (err) {
      return response.send({
        success: false,
        message: "Error: Server error",
      });
    }
    return response.send({
      success: true,
      message: "Component creation Successful!",
    });
  });
});

/**
 * Fetch ALL Components
 * C[R]UD := [R]EAD => GET(ALL)
 */
componentRouter.get("/component", (request, response) => {
  ComponentModel.find()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching all components details.\n ${err}`,
      });
    });
});

/**
 * Fetch Component by componentid
 * C[R]UD := [R]EAD => GET(ONE) - byId
 */

componentRouter.get("/component/:id", (request, response) => {
  var targetId = parseInt(request.params.id);
  ComponentModel.findOne({ componentId: targetId })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the component by id.\n ${err}`,
      });
    });
});

/**
 * To fetch all users By username with regex
 * C[R]UD := [R]EAD => GET(ALL) - byName
 */
componentRouter.get("/componentByName/:name", (request, response) => {
  var targetName = request.params.name;
  ComponentModel.find({ componentName: { $regex: targetName, $options: "i" } })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the components by component name.\n ${err}`,
      });
    });
});

/**
 * Update a component by component id
 * CR[U]D := [U]PDATE => PUT - ONE
 */
componentRouter.put("/component/:id", (request, response) => {
  var targetId = { componentId: parseInt(request.params.id) };
  var toBeUpdated = {
    $set: {
      componentName: request.body.componentName,
    },
  };
  ComponentModel.updateOne(targetId, toBeUpdated)
    .then((data) => {
      console.log("Component is updated!");
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while updating the Component details by id.\n ${err}`,
      });
    });
});

/**
 * Delete a Component by componentid
 * CRU[D] := [D]ELETE - DELETE - ONE
 */

componentRouter.delete("/component/:id", (request, response, next) => {
  var targetDelete = parseInt(request.params.id);
  ComponentModel.deleteOne({ componentId: targetDelete })
    .then(() => {
      response.status(200).json({
        message: "Component deletion Successful!",
      });
    })
    .catch((error) => {
      response.status(400).json({
        error: error,
      });
    });
});
module.exports = componentRouter;
