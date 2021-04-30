if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}
const express = require("express");
const api = express();
const mongoClient = require("mongodb").MongoClient;
const PORT = process.env.REACT_APP_PORT || 3000;
const DATABASE_NAME = process.env.REACT_APP_DATABASE_NAME || "btt";
const USER_COLLECTION_NAME =
  process.env.REACT_APP_USER_COLLECTION_NAME || "user_details";
const BUG_COLLECTION_NAME =
  process.env.REACT_APP_BUG_COLLECTION_NAME || "bug_details";
const LOCAL_DATABASE_URL =
  process.env.REACT_APP_LOCAL_DATABASE_URL || "mongodb://localhost:27017";

const cors = require("cors");
// const bcrypt = require("bcrypt");
api.use(cors());
api.use(express.json());
// Global variable
var database, userCollection, bugCollection;

// ---------------------------------------------------------
// To Create a Bug/Defect
// [C]RUD := [C]REATE => POST(ONE)
api.post("/btt/bug", (request, response) => {
  var toBeInsertedData = request.body;
  bugCollection.insertOne(toBeInsertedData, (err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});
// TO Fetch all the bugs
// C[R]UD := [R]EAD => GET(ALL)
api.get("/btt/bug", (request, response) => {
  bugCollection.find({}).toArray((err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});

// To Fetch a Bug by bug-Id
// C[R]UD := [R]EAD => GET(ONE) - byId
api.get("/btt/bug/:id", (request, response) => {
  var targetId = parseInt(request.params.id);
  bugCollection.findOne({ bugId: targetId }, (err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});

// To fetch all bugs By Name without regex
// C[R]UD := [R]EAD => GET(ALL) - byName
// api.get("/btt/bugByTitle/:name", (request, response) => {
//   var targetName = request.params.name;
//   bugCollection.find({ bugTitle: targetName }).toArray((err, result) => {
//     if (err) {
//       return response.status(500).send(err);
//     }
//     response.send(result);
//   });
// });

// To fetch all bugs By Title with regex
api.get("/btt/bugByTitle/:name", (request, response) => {
  var targetName = request.params.name;
  bugCollection
    .find({ bugTitle: { $regex: targetName, $options: "i" } })
    .toArray((err, result) => {
      if (err) {
        return response.status(500).send(err);
      }
      response.send(result);
    });
});

// ---------------------------------------------------------
// For User
// [C]RUD := [C]REATE => POST(ONE)
api.post("/btt", (request, response) => {
  var toBeInsertedData = request.body;
  userCollection.insertOne(toBeInsertedData, (err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});

// LOGIN
// api.post("/btt", async (request, response) => {
//   try {
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(request.body.password, salt);
//     console.log("salt: " + salt);
//     console.log("hashedPassword: " + hashedPassword);
//     var toBeInsertedData = {
//       userName: request.body.userName,
//       password: hashedPassword,
//     };
//     userCollection.insertOne(toBeInsertedData, (err, result) => {
//       if (err) {
//         return response.status(500).send(err);
//       }
//       response.status(201).send(result);
//     });
//   } catch {}
// });

// C[R]UD := [R]EAD => GET(ALL)
api.get("/btt", (request, response) => {
  userCollection.find({}).toArray((err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});

// C[R]UD := [R]EAD => GET(ONE) - byId
api.get("/btt/:id", (request, response) => {
  var targetId = parseInt(request.params.id);
  userCollection.findOne({ userId: targetId }, (err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});

// C[R]UD := [R]EAD => GET(ALL) - byName
api.get("/bttUserByName/:name", (request, response) => {
  var targetName = request.params.name;
  userCollection.find({ userName: targetName }).toArray((err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send(result);
  });
});

// CR[U]D := [U]PDATE => PUT - ONE
api.put("/btt/:id", (request, response) => {
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
  userCollection.updateOne(targetId, toBeUpdated, (err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    console.log("Record is updated!");
    response.send(result);
  });
});

// CRU[D] := [D]ELETE - DELETE - ONE
api.delete("/btt/:id", (request, response) => {
  var targetDelete = parseInt(request.params.id);
  userCollection.deleteOne({ userId: targetDelete }, (err, result) => {
    if (err) {
      return response.status(500).send(err);
    }
    response.send({
      message: `The record[user_id:${targetDelete}] has beeen deleted successfully!`,
      result,
    });
  });
});

// Setting server Port and establishing Mongo database connection
console.log("LOCAL DATABASE URL: " + LOCAL_DATABASE_URL);
console.log("PORT: " + PORT);
console.log("DATABASE NAME: " + DATABASE_NAME);
console.log("USER COLLECTION NAME: " + USER_COLLECTION_NAME);
console.log("BUG COLLECTION NAME: " + BUG_COLLECTION_NAME);

api.listen(PORT, () => {
  mongoClient.connect(LOCAL_DATABASE_URL, (err, client) => {
    if (err) {
      throw err;
    }
    database = client.db(DATABASE_NAME);
    userCollection = database.collection(USER_COLLECTION_NAME);
    bugCollection = database.collection(BUG_COLLECTION_NAME);
    console.log(
      `The BTT server is running on port ${PORT}...\nThe Database Connection is established successfully!!!`
    );
  });
});
