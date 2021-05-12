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
    // Default
    createdTime: {
      type: Date,
      default: Date().toLocaleString(),
    },
    commentType: {
      type: String,
      default: "public",
    },
  },
  { collection: "comment_details" }
);

module.exports = mongoose.model("comment_details", CommentSchema);
