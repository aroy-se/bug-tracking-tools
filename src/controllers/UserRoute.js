const express = require("express");
const UserModel = require("../models/UserModel");
const userRouter = express.Router();

/**
 * Fetch ALL Users
 * C[R]UD := [R]EAD => GET(ALL)
 */
userRouter.get("/user", (request, response) => {
  UserModel.find()
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching all users details.\n ${err}`,
      });
    });
});

/**
 * Fetch User details by uerid
 * C[R]UD := [R]EAD => GET(ONE) - byId
 */

userRouter.get("/user/:id", (request, response) => {
  var targetId = parseInt(request.params.id);
  UserModel.findOne({ userId: targetId })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the users details by id.\n ${err}`,
      });
    });
});

/**
 * To fetch all users By username with regex
 * C[R]UD := [R]EAD => GET(ALL) - byName
 */
userRouter.get("/userByName/:name", (request, response) => {
  var targetName = request.params.name;
  UserModel.find({ userName: { $regex: targetName, $options: "i" } })
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while fetching the users details by username.\n ${err}`,
      });
    });
});

/**
 * Update a User details by userid
 * CR[U]D := [U]PDATE => PUT - ONE
 */
userRouter.put("/user/:id", (request, response) => {
  var targetId = { userId: parseInt(request.params.id) };
  var toBeUpdated = {
    $set: {
      userName: request.body.userName,
      password: request.body.password,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      address1: request.body.address1,
      address2: request.body.address2,
      city: request.body.city,
      state: request.body.state,
      zip: request.body.zip,
      photo: request.body.photo,
      email: request.body.email,
      mobile: request.body.mobile,
    },
  };
  UserModel.updateOne(targetId, toBeUpdated)
    .then((data) => {
      console.log("User details is updated!");
      response.json(data);
    })
    .catch((err) => {
      return response.send({
        success: false,
        message: `Error: error occurred while updating the users details by userid.\n ${err}`,
      });
    });
});

/**
 * Delete a User details by userid
 * CRU[D] := [D]ELETE - DELETE - ONE
 */

userRouter.delete("/user/:id", (request, response, next) => {
  var targetDelete = parseInt(request.params.id);
  UserModel.deleteOne({ userId: targetDelete })
    .then(() => {
      response.status(200).json({
        message: "The User details has been deleted Successfully!",
      });
    })
    .catch((error) => {
      response.status(400).json({
        error: error,
      });
    });
});
module.exports = userRouter;
