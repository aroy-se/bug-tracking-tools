const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    bugId: {
      type: Number,
    },
    comment: {
      type: String,
      required: true,
      default: "",
    },
    commentator: {
      type: String,
      default: "Unknown",
    },
    commentType: {
      type: String,
      default: "",
    },
    // Default
    createdTime: {
      type: Date,
      default: Date().toLocaleString(),
    },
  },
  { collection: "comment_details" }
);

module.exports = mongoose.model("comment_details", CommentSchema);
