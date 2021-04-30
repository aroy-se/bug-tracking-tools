import "./App.css";

import { Switch, Route } from "react-router-dom";
import Header from "./views/common/Header";
import Home from "./views/common/Home";
import Login from "./views/common/Login";
import Registration from "./views/common/Registration";
import UserDashboard from "./views/users/UserDashboard";
import BugDashboard from "./views/bugs/BugDashboard";
import Faq from "./views/misc/Faq";
import About from "./views/misc/About";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/about" component={About} exact />
        <Route path="/faq" component={Faq} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/userDashboard" component={UserDashboard} />
        <Route path="/bugDashboard" component={BugDashboard} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
