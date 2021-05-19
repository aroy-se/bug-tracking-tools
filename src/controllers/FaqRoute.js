const express = require("express");
const FaqModel = require("../models/FaqModel");
const faqRouter = express.Router();

/**
 * Create a new faq request
 * [C]RUD := [C]REATE => POST(ONE)
 */
faqRouter.post("/faq", (request, response) => {
  const { body } = request;
  const { faqTitle, faqDesc } = body;

  if (!faqTitle) {
    return response.send({
      success: false,
      message: "Error: Title should not be blank",
    });
  }
  if (!faqDesc) {
    return response.send({
      success: false,
      message: "Error: Description should not be blank",
    });
  }

  // save the new component
  let faqObject = new FaqModel();
  faqRouter.faqId = Math.floor(Math.random() * (999 - 100) + 100); // Just demo purpose
  faqObject.faqTitle = faqTitle;
  faqObject.faqDesc = faqDesc;

  faqObject.save((err, faqObject) => {
    if (err) {
      return response.send({
        success: false,
        message: "Error: Server error",
      });
    }
    return response.send({
      success: true,
      message: "FAQ creation Successful!",
    });
  });
});

/**
 * Fetch ALL new faq request
 * C[R]UD := [R]EAD => GET(ALL)
 */
faqRouter.get("/faq", (request, response) => {
  FaqModel.find()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching all new faq request details.`,
      });
    });
});

/**
 * Fetch Component by componentid
 * C[R]UD := [R]EAD => GET(ONE) - byId
 */

// faqRouter.get("/component/:id", (request, response) => {
//   var targetId = parseInt(request.params.id);
//   FaqModel.findOne({ componentId: targetId })
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
// faqRouter.get("/componentByName/:name", (request, response) => {
//   var targetName = request.params.name;
//   FaqModel.find({
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
// faqRouter.put("/component/:id", (request, response) => {
//   var targetId = { componentId: parseInt(request.params.id) };
//   var toBeUpdated = {
//     $set: {
//       componentName: request.body.componentName,
//     },
//   };
//   FaqModel.updateOne(targetId, toBeUpdated)
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

// faqRouter.delete("/component/:id", (request, response, next) => {
//   var targetDelete = parseInt(request.params.id);
//   FaqModel.deleteOne({ componentId: targetDelete })
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
module.exports = faqRouter;
