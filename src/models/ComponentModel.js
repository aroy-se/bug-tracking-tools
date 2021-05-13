const mongoose = require("mongoose");

const ComponentSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      default: "",
    },
    componentName: {
      type: String,
      required: true,
      default: "",
    },

    // Backend default fields
    componentId: {
      type: Number,
      default: 0,
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "component_details" }
);

module.exports = mongoose.model("component_details", ComponentSchema);
