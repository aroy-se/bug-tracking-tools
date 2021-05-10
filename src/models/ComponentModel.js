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
      default: Math.floor(Math.random() * (999 - 100) + 100), // Just demo purpose
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "component_table" }
);

module.exports = mongoose.model("component_table", ComponentSchema);
