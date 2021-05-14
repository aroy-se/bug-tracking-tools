const express = require("express");
const BugModel = require("../models/BugModel");
const bugRouter = express.Router();

/**
 * Create a Bug
 * [C]RUD := [C]REATE => POST(ONE)
 */
bugRouter.post("/bug", (request, response) => {
  const { body } = request;
  const {
    issueType,
    component,
    reportVersion,
    os,
    issueSubType,
    severity,
    regressionVersion,
    browser,

    bugTitle,
    bugDesc,
    reproducibleSteps,
    expectedOutput,
    actualOutput,
    sourceCode,
    attachment,
    workaround,

    submitterName,
    submitterEmail,
    submitterCompany,
  } = body;

  if (!component) {
    return response.send({
      success: false,
      message: "Error: Component is not selected",
    });
  }
  if (!reportVersion) {
    return response.send({
      success: false,
      message: "Error: Report Version is not selected",
    });
  }
  if (!bugTitle) {
    return response.send({
      success: false,
      message: "Error: Bug Title can not be blank",
    });
  }
  if (!bugDesc) {
    return response.send({
      success: false,
      message: "Error: Bug Description can not not be blank",
    });
  }
  if (!submitterName) {
    return response.send({
      success: false,
      message: "Error: Submitter Name can not be blank",
    });
  }
  if (!submitterEmail) {
    return response.send({
      success: false,
      message: "Error: Submitter Email-ID can not be blank",
    });
  }
  if (!submitterCompany) {
    return response.send({
      success: false,
      message: "Error: Submitter Company can not be blank",
    });
  }

  // save the new Bug
  let newBug = new BugModel();
  newBug.bugId = Math.floor(Math.random() * (999999 - 100) + 100); // Just demo purpose;
  newBug.issueType = issueType;
  newBug.component = component;
  newBug.reportVersion = reportVersion;
  newBug.os = os;
  newBug.issueSubType = issueSubType;
  newBug.severity = severity;
  newBug.regressionVersion = regressionVersion;
  newBug.browser = browser;
  newBug.bugTitle = bugTitle;
  newBug.bugDesc = bugDesc;
  newBug.reproducibleSteps = reproducibleSteps;
  newBug.expectedOutput = expectedOutput;
  newBug.actualOutput = actualOutput;
  newBug.sourceCode = sourceCode;
  newBug.attachment = attachment;
  newBug.workaround = workaround;
  newBug.submitterName = submitterName;
  newBug.submitterEmail = submitterEmail;
  newBug.submitterCompany = submitterCompany;

  newBug.save((err, bug) => {
    if (err) {
      return response.send({
        success: false,
        message: "Error: Server error",
      });
    }
    return response.send({
      success: true,
      message: "Bug report creation Successful!",
    });
  });
});
/**
 * Fetch ALL Bug
 * C[R]UD := [R]EAD => GET(ALL)
 */
bugRouter.get("/bug", (request, response) => {
  BugModel.find()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching all the bug details.`,
      });
    });
});

/**
 * Fetch Bug details by bug-id
 * C[R]UD := [R]EAD => GET(ONE) - byId
 */

bugRouter.get("/bug/:id", (request, response) => {
  var targetId = parseInt(request.params.id);
  BugModel.findOne({ bugId: targetId })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the bug details by id.`,
      });
    });
});

/**
 * To fetch all bugs By bug-title with regex
 * C[R]UD := [R]EAD => GET(ALL) - byTitle
 */
bugRouter.get("/bugByTitle/:name", (request, response) => {
  var targetName = request.params.name;
  BugModel.find({ bugTitle: { $regex: targetName, $options: "i" } })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the users details by username.`,
      });
    });
});

/**
 * Update a Bug details by bugid
 * CR[U]D := [U]PDATE => PUT - ONE
 */
bugRouter.put("/bug/:id", (request, response) => {
  var targetId = { bugId: parseInt(request.params.id) };
  var toBeUpdated = {
    $set: {
      issueType: request.body.issueType,
      component: request.body.component,
      reportVersion: request.body.reportVersion,
      os: request.body.os,
      issueSubType: request.body.issueSubType,
      severity: request.body.severity,
      regressionVersion: request.body.regressionVersion,
      browser: request.body.browser,
      bugTitle: request.body.bugTitle,
      bugDesc: request.body.bugDesc,
      reproducibleSteps: request.body.reproducibleSteps,
      expectedOutput: request.body.expectedOutput,
      actualOutput: request.body.actualOutput,
      sourceCode: request.body.sourceCode,
      attachment: request.body.attachment,
      workaround: request.body.workaround,
      // submitterName: request.body.submitterName,
      // submitterEmail: request.body.submitterEmail,
      // submitterCompany: request.body.submitterCompany,
      assignee: request.body.assignee,
      eta: request.body.eta,
      fixVersion: request.body.fixVersion,
      resolution: request.body.resolution,
      state: request.body.state,
      priority: request.body.priority,
    },
  };
  BugModel.updateOne(targetId, toBeUpdated)
    .then((data) => {
      console.log("Bug details is updated!");
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while updating the bug details by bugid.`,
      });
    });
});

/**
 * Delete a Bug details by userid
 * CRU[D] := [D]ELETE - DELETE - ONE
 */
bugRouter.delete("/bug/:id", (request, response, next) => {
  var targetDelete = parseInt(request.params.id);
  BugModel.deleteOne({ bugId: targetDelete })
    .then(() => {
      response.status(200).json({
        message: "The Bug details has been deleted Successfully!",
      });
    })
    .catch((error) => {
      response.status(400).json({
        error: error,
      });
    });
});

/**
 * Set fixVersion by bug-id
 * CR[U]D := [U]PDATE => PUT - ONE
 */
bugRouter.put("/bug/fixVersion/:id", (request, response) => {
  var targetId = { bugId: parseInt(request.params.id) };
  var toBeUpdated = {
    $set: {
      fixVersion: request.body.fixVersion,
    },
  };
  BugModel.updateOne(targetId, toBeUpdated)
    .then((data) => {
      console.log("Fix Version is updated!");
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while setting the bug fix version by bugid`,
      });
    });
});

/**
 * To fetch all bugs By assigne wise
 * C[R]UD := [R]EAD => GET(ALL) - by assignee
 */
bugRouter.get("/bug/assignee/:name", (request, response) => {
  var targetName = request.params.name;
  BugModel.find({ assignee: targetName })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the users details by username.`,
      });
    });
});

module.exports = bugRouter;
