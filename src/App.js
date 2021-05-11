import "./App.css";
import React from "react";
import { withRouter } from "react-router-dom";
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
import AdminPanel from "./views/users/AdminPanel";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { storeEmail: "" };
    this.getData = this.getData.bind(this);
  }
  getData(email) {
    this.setState({ storeEmail: email });
    // console.log("Email " + email);
    // alert("Email: " + email);
  }

  render() {
    return (
      <div className="container-fluid pl-0 pr-0">
        <Header sendData={this.state.storeEmail} />
        <Switch>
          <Route path="/about" component={About} exact />
          <Route path="/faq" component={Faq} />
          <Route
            path="/login"
            render={() => (
              <Login
                appData={{
                  storeEmail: this.state.storeEmail,
                  getData: this.getData.bind(this),
                }}
              />
            )}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/registration" component={() => <Registration />} />
          <Route path="/userProfile" component={() => <UserProfile />} />
          <Route path="/adminPanel" component={AdminPanel} />
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
}

export default withRouter(App);
