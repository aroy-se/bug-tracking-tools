const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    // userName: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
    email: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    firstName: {
      type: String,
      required: true,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },

    address1: {
      type: String,
      default: "",
    },
    address2: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    state: {
      type: String,
      default: "",
    },
    zip: {
      type: String,
      default: "",
    },
    //   photo: {
    //     type: String,
    //     default: "NA",
    //   },
    // email: {
    //   type: String,
    //   required: true,
    //   default: "",
    // },
    mobile: {
      type: String,
      required: true,
      default: "",
    },
    // Backend default fields
    userId: {
      type: Number,
      default: Math.floor(Math.random() * (99999 - 100) + 100), // Just demo purpose
    },
    userRole: {
      type: String,
      default: "User",
    },
    createdTime: {
      type: Date,
      default: Date.now(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "user_details" }
);

UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user_details", UserSchema);
