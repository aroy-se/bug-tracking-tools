const UserSession = require("../models/UserSession");
const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();
/**
 * Registration Page
 */
router.post("/user/registration", (req, res, next) => {
  const { body } = req;
  const {
    userName,
    password,
    firstName,
    lastName,
    userRole,
    address1,
    address2,
    city,
    state,
    zip,
    photo,
    mobile,
  } = body;
  let { email } = body;

  if (!firstName) {
    return res.send({
      success: false,
      message: "Error: First Name cannot be blank",
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      message: "Error: Last Name cannot be blank",
    });
  }
  if (!userName) {
    return res.send({
      success: false,
      message: "Error: Username cannot be blank",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank",
    });
  }
  // if (!userRole) {
  //   return res.send({
  //     success: false,
  //     message: "Error: User Role cannot be blank",
  //   });
  // }
  if (!address1) {
    return res.send({
      success: false,
      message: "Error: Address1 cannot be blank",
    });
  }
  if (!address2) {
    return res.send({
      success: false,
      message: "Error: Address2 cannot be blank",
    });
  }
  if (!city) {
    return res.send({
      success: false,
      message: "Error: City cannot be blank",
    });
  }
  if (!state) {
    return res.send({
      success: false,
      message: "Error: State cannot be blank",
    });
  }
  if (!zip) {
    return res.send({
      success: false,
      message: "Error: Zip Code cannot be blank",
    });
  }
  // if (!photo) {
  //   return res.send({
  //     success: false,
  //     message: "Error: Photo cannot be blank",
  //   });
  // }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email-ID cannot be blank",
    });
  }
  if (!mobile) {
    return res.send({
      success: false,
      message: "Error: Mobile Number cannot be blank",
    });
  }
  email = email.toLowerCase();
  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  UserModel.find(
    {
      email: email,
    },
    (err, prevUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      } else if (prevUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: The User account already exist",
        });
      }
      // save the new user
      var newUser = new UserModel();
      newUser.userName = userName;
      newUser.password = newUser.generateHash(password);
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.userRole = userRole;
      newUser.address1 = address1;
      newUser.address2 = address2;
      newUser.city = city;
      newUser.state = state;
      newUser.zip = zip;
      newUser.photo = photo;
      newUser.email = email;
      newUser.mobile = mobile;

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          message: "Registration Successful ",
        });
      });
      /////
      // newUser.save()
      // .then(data =>{
      //     res.json(data);
      // })
      // .catch(err=>{
      //     res.json(err);
      // });
      ////
    }
  );
});

/**
 *  Login part
 */
router.post("/user/login", (req, res, next) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  if (!password) {
    return res.send({
      success: false,
      message: "Error: Password cannot be blank",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      message: "Error: Email-ID cannot be blank",
    });
  }
  email = email.toLowerCase();
  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error.",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid-No user",
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid password",
        });
      }
      // Otherwise-login success=true
      const userSession = new UserSession();
      userSession.uId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error",
          });
        }
        return res.send({
          success: true,
          message: "Login success...",
          token: doc._id,
        });
      });
    }
  );
});

/**
 * User verification
 */
router.get("/user/verify", (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  // verify the tokem is one of a kind a nd it's not deleted
  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid - no session",
        });
      } else {
        return res.send({
          success: true,
          message: "Verification Successful!",
        });
      }
    }
  );
});

/**
 * User logout
 */
router.get("/user/logout", (req, res, next) => {
  // get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  // verify the tokem is one of a kind a nd it's not deleted
  UserSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    { $set: { isDeleted: true } },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      }

      return res.send({
        success: true,
        message: "Logout Successful!",
      });
    }
  );
});
// };
module.exports = router;
