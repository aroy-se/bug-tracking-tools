// Various Type of Environments
export const PROD_ENV = "production";
export const DEV_ENV = "development";
export const TEST_ENV = "test";

// Constants for various type of user
export const END_USER = "User";
export const ADMIN = "Admin";
export const PROJECT_MANAGER = "Project Manager";
export const DEVELOPER = "Developer";
export const TRIAGEMAN = "TriageMan";
export const TESTER = "Tester";
export const ANONYMOUS_USER = "Anonymous User";
// Server Settings
const PORT = process.env.REACT_APP_PORT;
const DATABASE_NAME = process.env.REACT_APP_DATABASE_NAME;
// const USER_COLLECTION_NAME = process.env.REACT_APP_USER_COLLECTION_NAME; // user_details
// const BUG_COLLECTION_NAME = process.env.REACT_APP_BUG_COLLECTION_NAME; // bug_details
// const NEW_FEATURE_REQUEST_COLLECTION_NAME = process.env.REACT_APP_NEW_FEATURE_REQUEST_COLLECTION_NAME; // new_feature_request_details
// const COMPONENT_COLLECTION_NAME = process.env.REACT_APP_COMPONENT_COLLECTION_NAME; // component_details
const HOST = process.env.REACT_APP_HOSTNAME;

// Constants for User Data
const USER_PATH = process.env.REACT_APP_USER_PATH; // user
const USER_BY_EMAIL = process.env.REACT_APP_SEARCH_USER_BY_EMAIL;
export const USER_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${USER_PATH}/`;
export const URL_USER_BY_EMAIL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${USER_BY_EMAIL}/`;
export const URL_USER_BY_EXACT_EMAIL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${USER_PATH}/${USER_BY_EMAIL}/`;

// Default role of all users while registering
export const USER_ROLE = "User";

// Constants for Bug Data
const BUG_PATH = process.env.REACT_APP_BUG_PATH; // bug
const BUG_BY_TITLE = process.env.REACT_APP_SEARCH_BUG_BY_TITLE; // bugByTitle
const FIX_VERSION = process.env.REACT_APP_FIX_VERSION; // fixVersion
export const BUG_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${BUG_PATH}/`;
export const BUG_BY_TITLE_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${BUG_BY_TITLE}/`;
export const FIX_VERSION_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${BUG_PATH}/${FIX_VERSION}/`;

// Constants for new feature request
const FEATURE_REQUEST_PATH = process.env.REACT_APP_NEW_FEATURE_REQUEST_PATH; // newFeatureRequest
export const NEW_FEATURE_REQUEST_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${FEATURE_REQUEST_PATH}/`;

// Constants for user role
const USER_ROLE_PATH = process.env.REACT_APP_USER_ROLE_PATH; // userRole
export const USER_ROLE_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${USER_ROLE_PATH}/`;

// Constants for component
const COMPONENT_PATH = process.env.REACT_APP_COMPONENT_PATH; // component
const COMPONENT_BY_NAME = process.env.REACT_APP_SEARCH_COMPONENT_BY_NAME; // componentByName
export const COMPONENT_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${COMPONENT_PATH}/`;
export const COMPONENT_BY_NAME_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${COMPONENT_BY_NAME}/`;

// Constants for Comment
const COMMENT_PATH = process.env.REACT_APP_COMMENT_PATH; //comment
export const COMMENT_URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/${COMMENT_PATH}/`;
