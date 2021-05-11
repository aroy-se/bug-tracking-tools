const mongoose = require("mongoose");

const UserSessionSchema = new mongoose.Schema(
  {
    uId: {
      type: String,
      default: "",
    },
    timestamp: {
      type: Date,
      default: Date.now(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "user_sessions" }
);

UserSessionSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSessionSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user_sessions", UserSessionSchema);
