import React from "react";
import { Link } from "react-router-dom";
class HomeDashboard extends React.Component {
  render() {
    return (
      <div>
        <div class="dropdown-divider"></div>
        <Link
          to="/adminPanel"
          className="text-secondary dropdown-item"
          onClick={this.onClickLogin}
        >
          <i class="fas fa-user-cog"> Admin Panel</i>
        </Link>
        <Link to="/userDashboard" className="text-secondary dropdown-item">
          <i className="fas fa-users"> User Dashboard</i>
        </Link>
        <Link to="/bugDashboard" className="text-secondary dropdown-item">
          <i className="fas fa-bug"> Bug Dashboard</i>
        </Link>
      </div>
    );
  }
}

export default HomeDashboard;
