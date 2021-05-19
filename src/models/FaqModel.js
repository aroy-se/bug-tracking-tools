const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema(
  {
    faqTitle: {
      type: String,
      required: true,
      default: "",
    },
    faqDesc: {
      type: String,
      required: true,
      default: "",
    },

    // Backend default fields
    faqId: {
      type: Number,
      default: 0,
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "faq_details" }
);

module.exports = mongoose.model("faq_details", FaqSchema);
