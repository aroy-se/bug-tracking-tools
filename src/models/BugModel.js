const mongoose = require("mongoose");

const BugSchema = new mongoose.Schema(
  {
    issueType: {
      type: String,
      default: "",
    },
    component: {
      type: String,
      required: true,
      default: "",
    },
    reportVersion: {
      type: String,
      required: true,
      default: "",
    },
    os: {
      type: String,
      default: "",
    },

    issueSubType: {
      type: String,
      default: "",
    },
    severity: {
      type: String,
      default: "",
    },
    regressionVersion: {
      type: String,
      default: "",
    },
    browser: {
      type: String,
      default: "",
    },
    bugTitle: {
      type: String,
      required: true,
      default: "",
    },
    bugDesc: {
      type: String,
      required: true,
      default: "NA",
    },
    reproducibleSteps: {
      type: String,
      default: "",
    },
    expectedOutput: {
      type: String,
      default: "",
    },
    actualOutput: {
      type: String,
      default: "",
    },
    sourceCode: {
      type: String,
      default: "",
    },
    attachment: {
      type: String,
      default: "",
    },
    workaround: {
      type: String,
      default: "",
    },
    submitterName: {
      type: String,
      required: true,
      default: "",
    },
    submitterEmail: {
      type: String,
      required: true,
      default: "",
    },
    submitterCompany: {
      type: String,
      required: true,
      default: "",
    },

    // Backend default fields
    bugId: {
      type: Number,
      default: 0,
    },
    assignee: {
      type: String,
      default: "Unknown",
    },
    createdTime: {
      type: Date,
      default: Date().toLocaleString(),
    },
    eta: {
      type: String,
      default: "NA",
    },
    fixVersion: {
      type: String,
      default: "NA",
    },
    resolution: {
      type: String,
      default: "Unresolved",
    },
    state: {
      type: String,
      default: "New",
    },
    priority: {
      type: String,
      default: "Undecided",
    },
  },
  { collection: "bug_details" }
);

module.exports = mongoose.model("bug_details", BugSchema);
