const mongoose = require("mongoose");

const NewFeatureRequestSchema = new mongoose.Schema(
  {
    featureTitle: {
      type: String,
      required: true,
      default: "",
    },
    featureDesc: {
      type: String,
      required: true,
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
    featureId: {
      type: Number,
      default: 0,
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "new_feature_request_details" }
);

module.exports = mongoose.model(
  "new_feature_request_table",
  NewFeatureRequestSchema
);
