import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
// import Welcome from "./views/Welcome";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <Welcome /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
