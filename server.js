if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.REACT_APP_PORT || 3000;
const URL_P1 = process.env.REACT_APP_MONGODB_ATLAS_DATABASE_URL_PRE;
const URL_P2 = process.env.REACT_APP_MONGODB_ATLAS_USERNAME;
const URL_P3 = process.env.REACT_APP_MONGODB_ATLAS_PASSWORD;
const URL_P4 = process.env.REACT_APP_MONGODB_ATLAS_DATABASE_URL_POST;
const URL_P5 = process.env.REACT_APP_MONGODB_ATLAS_DATABASE_NAME;
const LOCAL_DATABASE_URL =
  process.env.REACT_APP_LOCAL_DATABASE_URL || "mongodb://localhost:27017";
const MONGODB_ATLAS_DATABASE_URL =
  URL_P1 + URL_P2 + ":" + URL_P3 + URL_P4 + URL_P5 || LOCAL_DATABASE_URL;

const USER_AUTHENTICATION_ROUTE = require("./src/controllers/UserAuthenticationRoute");
const USER_ROUTE = require("./src/controllers/UserRoute");
const COMPONENT_ROUTE = require("./src/controllers/ComponentRoute");
const NEW_FEATURE_REQUEST_ROUTE = require("./src/controllers/NewFeatureRequestRoute");
const BUG_ROUTE = require("./src/controllers/BugRoute");

const cors = require("cors");

mongoose.connect(
  MONGODB_ATLAS_DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Database connected...")
);
// Middleware(express.json and cors) - activated body-parser in the app
app.use(express.json());
app.use(cors());

app.use("/btt", USER_AUTHENTICATION_ROUTE);
app.use("/btt", USER_ROUTE);
app.use("/btt", COMPONENT_ROUTE);
app.use("/btt", NEW_FEATURE_REQUEST_ROUTE);
app.use("/btt", BUG_ROUTE);
app.listen(PORT, () => {
  console.log(`[Port: ${PORT}] - The BTT app server is up and running...`);
});
