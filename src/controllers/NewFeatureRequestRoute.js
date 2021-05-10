const express = require("express");
const NewFeatureRequestModel = require("../models/NewFeatureRequestModel");
const newFeatureRequestRouter = express.Router();

/**
 * Create a new feature request
 * [C]RUD := [C]REATE => POST(ONE)
 */
newFeatureRequestRouter.post("/newFeatureRequest", (request, response) => {
  const { body } = request;
  const {
    featureTitle,
    featureDesc,
    submitterName,
    submitterEmail,
    submitterCompany,
  } = body;

  if (!featureTitle) {
    return response.send({
      success: false,
      message: "Error: Title should not be blank",
    });
  }
  if (!featureDesc) {
    return response.send({
      success: false,
      message: "Error: Decription should not be blank",
    });
  }
  if (!submitterName) {
    return response.send({
      success: false,
      message: "Error: Submitter Name should not be blank",
    });
  }
  if (!submitterEmail) {
    return response.send({
      success: false,
      message: "Error: Submitter Email-ID should not be blank",
    });
  }
  if (!submitterCompany) {
    return response.send({
      success: false,
      message: "Error: Submitter Company Name cannot be blank",
    });
  }

  // save the new component
  let newFeatureRequest = new NewFeatureRequestModel();
  newFeatureRequest.featureTitle = featureTitle;
  newFeatureRequest.featureDesc = featureDesc;
  newFeatureRequest.submitterName = submitterName;
  newFeatureRequest.submitterEmail = submitterEmail;
  newFeatureRequest.submitterCompany = submitterCompany;

  newFeatureRequest.save((err, newFeatureRequest) => {
    if (err) {
      return response.send({
        success: false,
        message: "Error: Server error",
      });
    }
    return response.send({
      success: true,
      message: "New-Feature-Request creation Successful!",
    });
  });
});

/**
 * Fetch ALL Components
 * C[R]UD := [R]EAD => GET(ALL)
 */
// newFeatureRequestRouter.get("/component", (request, response) => {
//   NewFeatureRequestModel.find()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while fetching all components details.\n ${err}`,
//       });
//     });
// });

/**
 * Fetch Component by componentid
 * C[R]UD := [R]EAD => GET(ONE) - byId
 */

// newFeatureRequestRouter.get("/component/:id", (request, response) => {
//   var targetId = parseInt(request.params.id);
//   NewFeatureRequestModel.findOne({ componentId: targetId })
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while fetching the component by id.\n ${err}`,
//       });
//     });
// });

/**
 * To fetch all users By username with regex
 * C[R]UD := [R]EAD => GET(ALL) - byName
 */
// newFeatureRequestRouter.get("/componentByName/:name", (request, response) => {
//   var targetName = request.params.name;
//   NewFeatureRequestModel.find({
//     componentName: { $regex: targetName, $options: "i" },
//   })
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while fetching the components by component name.\n ${err}`,
//       });
//     });
// });

/**
 * Update a component by component id
 * CR[U]D := [U]PDATE => PUT - ONE
 */
// newFeatureRequestRouter.put("/component/:id", (request, response) => {
//   var targetId = { componentId: parseInt(request.params.id) };
//   var toBeUpdated = {
//     $set: {
//       componentName: request.body.componentName,
//     },
//   };
//   NewFeatureRequestModel.updateOne(targetId, toBeUpdated)
//     .then((data) => {
//       console.log("Component is updated!");
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while updating the Component details by id.\n ${err}`,
//       });
//     });
// });

/**
 * Delete a Component by componentid
 * CRU[D] := [D]ELETE - DELETE - ONE
 */

// newFeatureRequestRouter.delete("/component/:id", (request, response, next) => {
//   var targetDelete = parseInt(request.params.id);
//   NewFeatureRequestModel.deleteOne({ componentId: targetDelete })
//     .then(() => {
//       response.status(200).json({
//         message: "Component deletion Successful!",
//       });
//     })
//     .catch((error) => {
//       response.status(400).json({
//         error: error,
//       });
//     });
// });
module.exports = newFeatureRequestRouter;
