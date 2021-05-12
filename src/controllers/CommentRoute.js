const express = require("express");
const CommentModel = require("../models/CommentModel");
const commentRouter = express.Router();

/**
 * Post a Comment to a bug
 * [C]RUD := [C]REATE => POST(ONE)
 */
commentRouter.post("/comment", (request, response) => {
  const { body } = request;
  const { bugId, comment, commentator } = body;

  if (!comment) {
    return response.send({
      success: false,
      message: "Error: comment can not be blank",
    });
  }

  // save the new comment
  let newComment = new CommentModel();
  newComment.bugId = bugId;
  newComment.comment = comment;
  newComment.commentator = commentator;

  newComment.save((err, comment) => {
    if (err) {
      return response.send({
        success: false,
        message: "Error: Server error",
      });
    }
    return response.send({
      success: true,
      message: "Comment posted Successfully!",
    });
  });
});
// /**
//  * Fetch ALL Users
//  * C[R]UD := [R]EAD => GET(ALL)
//  */
// bugRouter.get("/comment", (request, response) => {
//   BugModel.find()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while fetching all the bug details.\n ${err}`,
//       });
//     });
// });

/**
 * Fetch Comments  by bugId
 * C[R]UD := [R]EAD => GET(ONE) - byId
 */

commentRouter.get("/comment/:id", (request, response) => {
  var targetId = parseInt(request.params.id);
  CommentModel.find({ bugId: targetId })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the Comment details by bug-Id.`,
      });
    });
});

// /**
//  * To fetch all users By username with regex
//  * C[R]UD := [R]EAD => GET(ALL) - byName
//  */
// bugRouter.get("/bugByTitle/:name", (request, response) => {
//   var targetName = request.params.name;
//   BugModel.find({ bugTitle: { $regex: targetName, $options: "i" } })
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while fetching the users details by username.\n ${err}`,
//       });
//     });
// });

// /**
//  * Update a User details by userid
//  * CR[U]D := [U]PDATE => PUT - ONE
//  */
// bugRouter.put("/bug/:id", (request, response) => {
//   var targetId = { bugId: parseInt(request.params.id) };
//   var toBeUpdated = {
//     $set: {
//       issueType: request.body.issueType,
//       component: request.body.component,
//       reportVersion: request.body.reportVersion,
//       os: request.body.os,
//       issueSubType: request.body.issueSubType,
//       severity: request.body.severity,
//       regressionVersion: request.body.regressionVersion,
//       browser: request.body.browser,
//       bugTitle: request.body.bugTitle,
//       bugDesc: request.body.bugDesc,
//       reproducibleSteps: request.body.reproducibleSteps,
//       expectedOutput: request.body.expectedOutput,
//       actualOutput: request.body.actualOutput,
//       sourceCode: request.body.sourceCode,
//       attachment: request.body.attachment,
//       workaround: request.body.workaround,
//       // submitterName: request.body.submitterName,
//       // submitterEmail: request.body.submitterEmail,
//       // submitterCompany: request.body.submitterCompany,
//       assignee: request.body.assignee,
//       eta: request.body.eta,
//       fixVersion: request.body.fixVersion,
//       resolution: request.body.resolution,
//       state: request.body.state,
//       priority: request.body.priority,
//     },
//   };
//   BugModel.updateOne(targetId, toBeUpdated)
//     .then((data) => {
//       console.log("Bug details is updated!");
//       response.json(data);
//     })
//     .catch((err) => {
//       return response.send({
//         success: false,
//         message: `Error: error occurred while updating the bug details by bugid.\n ${err}`,
//       });
//     });
// });

// /**
//  * Delete a User details by userid
//  * CRU[D] := [D]ELETE - DELETE - ONE
//  */
// bugRouter.delete("/bug/:id", (request, response, next) => {
//   var targetDelete = parseInt(request.params.id);
//   BugModel.deleteOne({ bugId: targetDelete })
//     .then(() => {
//       response.status(200).json({
//         message: "The Bug details has been deleted Successfully!",
//       });
//     })
//     .catch((error) => {
//       response.status(400).json({
//         error: error,
//       });
//     });
// });

module.exports = commentRouter;
