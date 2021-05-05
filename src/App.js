import "./App.css";
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./views/common/Header";
import Home from "./views/common/Home";
import Login from "./views/common/Login";
import Logout from "./views/common/Logout";
import Registration from "./views/common/Registration";
import UserProfile from "./views/users/UserProfile";
import UserDashboard from "./views/users/UserDashboard";
import BugDashboard from "./views/bugs/BugDashboard";
import CreateBugDetails from "./views/bugs/CreateBugDetails";
import NewFeature from "./views/bugs/NewFeature";
import BugList from "./views/bugs/BugList";
import FetchBugDetailsById from "./views/bugs/FetchBugDetailsById";
import UpdateBugDetails from "./views/bugs/UpdateBugDetails";
import Faq from "./views/misc/Faq";
import About from "./views/misc/About";

function App() {
  const [userDetails, setUserDetails] = useState("");
  return (
    <div className="container-fluid pl-0 pr-0">
      <Header />
      <Switch>
        <Route path="/about" component={About} exact />
        <Route path="/faq" component={Faq} />
        <Route path="/login" component={() => <Login />} />
        <Route path="/logout" component={Logout} />
        <Route
          path="/registration"
          component={() => <Registration setUserDetails={setUserDetails} />}
        />
        <Route
          path="/userProfile"
          component={() => <UserProfile userDetails={userDetails} />}
        />
        <Route path="/userDashboard" component={UserDashboard} />
        <Route path="/bugDashboard" component={BugDashboard} />
        <Route path="/createBugDetails" component={CreateBugDetails} />
        <Route path="/newFeature" component={NewFeature} />
        <Route path="/bugList" component={BugList} />
        <Route path="/fetchBugDetailsById" component={FetchBugDetailsById} />
        <Route path="/updateBugDetails" component={UpdateBugDetails} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
