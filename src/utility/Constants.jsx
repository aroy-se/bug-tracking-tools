// Server Settings
const PORT = process.env.REACT_APP_PORT;
const DATABASE_NAME = process.env.REACT_APP_DATABASE_NAME;
const HOST = process.env.REACT_APP_HOSTNAME;
const USER_BY_NAME = process.env.REACT_APP_SEARCH_USER_BY_NAME;
export const URL = `http://${HOST}:${PORT}/${DATABASE_NAME}/`;
export const URL_USER_BY_NAME = `http://${HOST}:${PORT}/${USER_BY_NAME}/`;

// Default role of all users while registering
export const USER_ROLE = "user";

// Various Type of Environments
export const PROD_ENV = "production";
export const DEV_ENV = "development";
export const TEST_ENV = "test";
