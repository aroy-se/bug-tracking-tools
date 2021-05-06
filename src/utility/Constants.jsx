// Various Type of Environments
export const PROD_ENV = "production";
export const DEV_ENV = "development";
export const TEST_ENV = "test";

// Server Settings
const PORT = process.env.REACT_APP_PORT;
const DATABASE_NAME = process.env.REACT_APP_DATABASE_NAME;
// const USER_COLLECTION_NAME = process.env.REACT_APP_USER_COLLECTION_NAME; // user_details
// const BUG_COLLECTION_NAME = process.env.REACT_APP_BUG_COLLECTION_NAME; // bug_details
// const NEW_FEATURE_REQUEST_COLLECTION_NAME = process.env.REACT_APP_NEW_FEATURE_REQUEST_COLLECTION_NAME; // new_feature_request_details
// const COMPONENT_COLLECTION_NAME = process.env.REACT_APP_COMPONENT_COLLECTION_NAME; // component_details
const HOST = process.env.REACT_APP_HOSTNAME;

// Constatnts for User Data
const USER_BY_NAME = process.env.REACT_APP_SEARCH_USER_BY_NAME;
export const URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/`;
export const URL_USER_BY_NAME = `http://${HOST}:${PORT}/${USER_BY_NAME}/`;

// Default role of all users while registering
export const USER_ROLE = "User";

// Constants for Bug Data
const BUG_PATH = process.env.REACT_APP_BUG_PATH; // bug
const BUG_BY_TITLE = process.env.REACT_APP_SEARCH_BUG_BY_TITLE; // bugByTitle
export const BUG_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${BUG_PATH}/`;
export const BUG_BY_TITLE_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${BUG_BY_TITLE}/`;

// Constatnt for new feature request
const FEATURE_REQUEST_PATH = process.env.REACT_APP_NEW_FEATURE_REQUEST_PATH; // newFeatureRequest
export const NEW_FEATURE_REQUEST_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${FEATURE_REQUEST_PATH}/`;

// Constatnt for user role
const USER_ROLE_PATH = process.env.REACT_APP_USER_ROLE_PATH; // userRole
export const USER_ROLE_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${USER_ROLE_PATH}/`;

// Constatnt for user role
const COMPONENT_PATH = process.env.REACT_APP_COMPONENT_PATH; // component
const COMPONENT_BY_NAME = process.env.REACT_APP_SEARCH_COMPONENT_BY_NAME; // componentByName
export const COMPONENT_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${COMPONENT_PATH}/`;
export const COMPONENT_BY_NAME_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${COMPONENT_BY_NAME}/`;
